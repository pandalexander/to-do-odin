import _, { first, transform } from "lodash";
import "./style.css";
// import { Project, ToDo } from "./build-project.js";
import { parseISO, format, differenceInDays, parse } from "date-fns";
import BookIcon from "./svg/book.svg";
import CheckCircleIcon from "./svg/check-circle.svg";
import CircleIcon from "./svg/circle.svg";
import PlusSquare from "./svg/plus-square.svg";
import PlusIcon from "./svg/plus.svg";
import EditIcon from "./svg/edit.svg";
import EyeIcon from "./svg/eye.svg";
import TrashIcon from "./svg/trash.svg";

const plusSquareIcon = document.getElementById("plus-square-icon");
const plusIcon = document.getElementById("plus-icon");

plusSquareIcon.src = PlusSquare;
plusIcon.src = PlusIcon;

let allProjectArray = [];

class Project {
  constructor(name) {
    this.name = name;
    this.list = [];
    if (this.isNameTaken()) {
      alert("Project name already exists. Please choose a different name.");
    } else {
      allProjectArray.push(this);
    }
  }

  isNameTaken() {
    return allProjectArray.some((project) => project.name === this.name);
  }
}

const defaultProject = new Project("My To-Do");

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.projectPublicName = project.name;
    this.completed = false;
    for (const item of allProjectArray) {
      if (item.name == project) {
        item.list.push(this);
      }
    }
  }
}

const firstTodo = new Todo(
  "Do Taxes",
  "Do you Taxes, man.",
  "04/15/2024",
  2,
  "My To-Do"
);

function changeProjectName(project, newName) {
  project.name = newName;
}

function changeTitle(object, newTitle) {
  object.title = newTitle;
}

function changeDescription(object, newDescription) {
  object.description = newDescription;
}

function formatDate(inputDate) {
  const parsedDate = parse(inputDate, "yyyy-MM-dd", new Date());
  return format(parsedDate, "MM/dd/yyyy");
}

function changeDueDate(object, newDueDate) {
  object.dueDate = newDueDate;
}

function changePriority(object, newPriority) {
  object.priority = newPriority;
}

function changeCompletion(object) {
  if (object.completed) {
    object.completed = false;
  } else if (!object.completed) {
    object.completed = true;
  }
}

function deleteTodo(todoItem) {
  for (const project of allProjectArray) {
    if ((todoItem.project = project.name)) {
      project.list = project.list.filter(
        (object) => object.title != todoItem.title
      );
    }
  }
}

function changeProject(todoItem, newProject) {
  for (const project of allProjectArray) {
    if ((todoItem.project = project.name)) {
      project.list = project.list.filter(
        (object) => object.title != todoItem.title
      );
    }
  }

  for (const project of allProjectArray) {
    if (project.name == newProject) {
      todoItem.project = project.name;
      project.list.push(todoItem);
      todoItem.projectPublicName = project.name;
    }
  }
}

function deleteProject(project) {
  allProjectArray = allProjectArray.filter(
    (object) => object.name != project.name
  );
  return "HEY!";
}

// DOM MANIPULATION

const body = document.getElementById("body");
const leftContainer = document.getElementById("left-container");
const rightContainer = document.getElementById("right-container");
const viewTodoPopup = document.getElementById("view-todo-popup");

function printProjectsOnSidebar() {
  leftContainer.innerHTML = "";

  let allProjectHeader = document.createElement("h2");
  allProjectHeader.textContent = "All Projects";
  leftContainer.appendChild(allProjectHeader);

  let addNewDiv = document.createElement("div");
  addNewDiv.classList.add("add-new-section");
  leftContainer.appendChild(addNewDiv);

  let addProjectSubDiv = document.createElement("div");
  addProjectSubDiv.classList.add("item");
  addProjectSubDiv.setAttribute("id", "show-project-popup");
  addNewDiv.appendChild(addProjectSubDiv);

  document
    .getElementById("show-project-popup")
    .addEventListener("click", function () {
      document.getElementById("add-project-popup").style.display = "block";
    });

  let plusIcon = document.createElement("img");
  plusIcon.src = PlusSquare;
  addProjectSubDiv.appendChild(plusIcon);

  let addProjectPara = document.createElement("p");
  addProjectPara.textContent = "Add Project";
  addProjectSubDiv.appendChild(addProjectPara);

  // Add ToDo

  let addTodoDiv = document.createElement("div");
  addTodoDiv.classList.add("item");
  addTodoDiv.setAttribute("id", "show-todo-popup");
  addNewDiv.appendChild(addTodoDiv);

  let plusTodoIcon = document.createElement("img");
  plusTodoIcon.src = PlusIcon;
  addTodoDiv.appendChild(plusTodoIcon);

  let addTodoPara = document.createElement("p");
  addTodoPara.textContent = "Add Todo";
  addTodoDiv.appendChild(addTodoPara);

  document
    .getElementById("show-todo-popup")
    .addEventListener("click", function () {
      document.getElementById("todo-project").innerHTML = "";
      for (const project of allProjectArray) {
        let projectOption = document.createElement("option");
        projectOption.value = project.name;
        projectOption.textContent = project.name;
        todoProjectSelect.appendChild(projectOption);
        console.log(allProjectArray);
        console.log(project);
      }
      document.getElementById("add-todo-popup").style.display = "block";
    });

  for (const item of allProjectArray) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    leftContainer.appendChild(newDiv);

    let trashIcon = document.createElement("img");
    trashIcon.src = TrashIcon;
    trashIcon.style.marginRIGHT = "5px";
    trashIcon.onclick = function () {
      deleteProject(item);
      printEverything();
    };
    newDiv.appendChild(trashIcon);

    let p = document.createElement("p");
    p.textContent = item.name;
    newDiv.appendChild(p);
  }
}

function printAllTodoItems() {
  rightContainer.innerHTML = "";
  let allProjectsHeader = document.createElement("h1");
  allProjectsHeader.textContent = "All Projects";
  rightContainer.appendChild(allProjectsHeader);

  for (const item of allProjectArray) {
    let newProjectView = document.createElement("div");
    newProjectView.classList.add("project-view");
    rightContainer.appendChild(newProjectView);

    let newProjectHeader = document.createElement("h3");
    newProjectHeader.textContent = item.name;
    newProjectView.appendChild(newProjectHeader);

    for (let i = 0; i < item.list.length; i++) {
      let newToDoDiv = document.createElement("div");
      newToDoDiv.classList.add("to-do-item");
      newProjectView.appendChild(newToDoDiv);

      let toDoImage = document.createElement("img");
      if (item.list[i].completed) {
        toDoImage.src = CheckCircleIcon;
      } else {
        toDoImage.src = CircleIcon;
      }
      toDoImage.onclick = function () {
        changeCompletion(item.list[i]);
        printEverything();
      };
      newToDoDiv.appendChild(toDoImage);

      let para = document.createElement("p");
      para.textContent = item.list[i].title;
      newToDoDiv.appendChild(para);

      let span = document.createElement("span");
      if (item.list[i].completed) {
        span.classList.add("done");
      } else {
        span.classList.add("undone");
      }
      span.textContent = "Due: " + item.list[i].dueDate;
      newToDoDiv.appendChild(span);

      let viewButton = document.createElement("img");
      viewButton.src = EyeIcon;
      viewButton.classList.add("view-button");
      viewButton.onclick = function () {
        // View to-Do Item DOM manipulation
        let viewSpecificTodo = document.getElementById(
          "view-todo-popup-specific"
        );
        let obj = item.list[i];

        viewSpecificTodo.innerHTML = "";

        let viewTitle = document.createElement("h2");
        viewTitle.textContent = obj.title;
        viewSpecificTodo.appendChild(viewTitle);

        let viewDescription = document.createElement("p");
        viewDescription.textContent = obj.description;
        viewDescription.style.fontStyle = "italic";
        viewSpecificTodo.appendChild(viewDescription);

        let viewPriority = document.createElement("p");
        if (obj.priority == 0) {
          viewPriority.textContent = "Priority: Low";
          viewPriority.style.color = "#00685e";
        } else if (obj.priority == 1) {
          viewPriority.textContent = "Priority: Medium";
          viewPriority.style.color = "#fa9370";
        } else if (obj.priority == 2) {
          viewPriority.textContent = "Priority: High";
          viewPriority.style.color = "#ce0037";
        } else {
          viewPriority.textContent = "Priority: Unsure...";
        }
        viewSpecificTodo.appendChild(viewPriority);

        let viewDueDate = document.createElement("p");
        viewDueDate.textContent = "Due: " + obj.dueDate;
        viewDueDate.style.color = viewPriority.style.color;

        viewSpecificTodo.appendChild(viewDueDate);

        let viewProject = document.createElement("p");
        viewProject.textContent = "Project: " + obj.project;
        viewProject.style.color = "#485cc7";
        viewSpecificTodo.appendChild(viewProject);

        let viewCompleted = document.createElement("p");
        if (obj.completed) {
          let nodes = viewSpecificTodo.childNodes;
          for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.textDecoration = "line-through";
          }
          viewCompleted.style.color = "#7aad7b";
          viewCompleted.textContent = "Status: Done! Hooray!";
        } else {
          viewCompleted.textContent = "Status: Still need to do...";
          viewCompleted.style.color = "orange";
        }
        viewSpecificTodo.appendChild(viewCompleted);

        document.getElementById("view-todo-popup").style.display = "block";

        document
          .getElementById("view-todo-popup-close")
          .addEventListener("click", function () {
            document.getElementById("view-todo-popup").style.display = "none";
          });

        window.addEventListener("click", function (event) {
          if (event.target == document.getElementById("view-todo-popup")) {
            document.getElementById("view-todo-popup").style.display = "none";
          }
        });
      };
      newToDoDiv.appendChild(viewButton);

      let editButton = document.createElement("img");
      editButton.src = EditIcon;
      editButton.classList.add("edit-button");
      editButton.onclick = function () {
        // View to-Do Item DOM manipulation
        let editSpecificTodo = document.getElementById(
          "edit-todo-popup-specific"
        );

        const editTodoProjectSelect =
          document.getElementById("edit-todo-project");

        editTodoProjectSelect.innerHTML = "";
        for (const project of allProjectArray) {
          let projectOption = document.createElement("option");
          projectOption.value = project.name;
          projectOption.textContent = project.name;
          editTodoProjectSelect.appendChild(projectOption);
        }

        let obj = item.list[i];

        document.getElementById("edit-todo-title").value = obj.title;

        document.getElementById("edit-todo-due-date").value = format(
          new Date(
            obj.dueDate.split("/")[2],
            obj.dueDate.split("/")[0] - 1,
            obj.dueDate.split("/")[1]
          ),
          "yyyy-MM-dd"
        );

        document.getElementById("edit-todo-description").value =
          obj.description;

        document.getElementById("edit-todo-priority").value = obj.priority;

        document.getElementById("edit-todo-project").value = obj.project;

        function submitHandler(event) {
          event.preventDefault(); // Prevent the default form submission behavior

          if (document.getElementById("edit-todo-title").value !== "") {
            changeTitle(obj, document.getElementById("edit-todo-title").value);
          }

          changeDueDate(
            obj,
            formatDate(document.getElementById("edit-todo-due-date").value)
          );

          changeDescription(
            obj,
            document.getElementById("edit-todo-description").value
          );

          changePriority(
            obj,
            document.getElementById("edit-todo-priority").value
          );

          changeProject(
            obj,
            document.getElementById("edit-todo-project").value
          );

          // Reset the form
          this.reset();

          // Hide the popup
          document.getElementById("edit-todo-popup").style.display = "none";
          printEverything();

          // Remove the event listener after submission
          this.removeEventListener("submit", submitHandler);
        }

        document
          .getElementById("edit-todo-form")
          .addEventListener("submit", submitHandler);

        document.getElementById("edit-todo-popup").style.display = "block";

        document
          .getElementById("edit-todo-popup-close")
          .addEventListener("click", function () {
            document.getElementById("edit-todo-popup").style.display = "none";
          });

        window.addEventListener("click", function (event) {
          if (event.target == document.getElementById("edit-todo-popup")) {
            document.getElementById("edit-todo-popup").style.display = "none";
          }
        });
      };
      newToDoDiv.appendChild(editButton);

      let trashTodoButton = document.createElement("img");
      trashTodoButton.src = TrashIcon;
      trashTodoButton.onclick = function () {
        // console.log(item.list[i].project.list);
        console.log(item.list[i].project);
        deleteTodo(item.list[i]);
        printEverything();
      };
      newToDoDiv.appendChild(trashTodoButton);
    }
  }
}

function printEverything() {
  printAllTodoItems();
  printProjectsOnSidebar();
}

printEverything();

// Popup for new Project - DOM

document
  .getElementById("show-project-popup")
  .addEventListener("click", function () {
    document.getElementById("add-project-popup").style.display = "block";
  });

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("add-project-popup").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("add-project-popup")) {
    document.getElementById("add-project-popup").style.display = "none";
  }
});

document
  .getElementById("add-project-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the input value
    var projectName = document.getElementById("project-name").value;

    // Log the input value to the console

    var newProject = new Project(projectName);

    // You can add further processing here, like sending the data to the server

    // Reset the form
    this.reset();

    // Hide the popup
    document.getElementById("add-project-popup").style.display = "none";
    printEverything();

    console.log(allProjectArray);
  });

// Popup for new todo - DOM
const todoProjectSelect = document.getElementById("todo-project");
document
  .getElementById("show-todo-popup")
  .addEventListener("click", function () {
    document.getElementById("todo-project").innerHTML = "";
    for (const project of allProjectArray) {
      let projectOption = document.createElement("option");
      projectOption.value = project.name;
      projectOption.textContent = project.name;
      todoProjectSelect.appendChild(projectOption);
      console.log(allProjectArray);
      console.log(project);
    }
    document.getElementById("add-todo-popup").style.display = "block";
  });

document
  .getElementById("todo-popup-close")
  .addEventListener("click", function () {
    document.getElementById("add-todo-popup").style.display = "none";
  });

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("add-todo-popup")) {
    document.getElementById("add-todo-popup").style.display = "none";
  }
});

document
  .getElementById("add-todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    let newTodoTitle = document.getElementById("todo-title").value;
    let newTodoDescription = document.getElementById("todo-description").value;
    let newTodoDueDate = format(
      parseISO(document.getElementById("todo-due-date").value),
      "M/dd/yyyy"
    );

    let newTodoPriority = Number(
      document.getElementById("todo-priority").value
    );
    let newTodoProject = document.getElementById("todo-project").value;

    let newTodo = new Todo(
      newTodoTitle,
      newTodoDescription,
      newTodoDueDate,
      newTodoPriority,
      newTodoProject
    );

    // Reset the form
    this.reset();

    // Hide the popup
    document.getElementById("add-todo-popup").style.display = "none";
    printEverything();
  });
