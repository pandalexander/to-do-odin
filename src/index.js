import _, { first } from "lodash";
import "./style.css";
// import { Project, ToDo } from "./build-project.js";
import { compareAsc, format } from "date-fns";
import BookIcon from "./svg/book.svg";
import CheckCircleIcon from "./svg/check-circle.svg";
import CircleIcon from "./svg/circle.svg";
import PlusSquare from "./svg/plus-square.svg";
import PlusIcon from "./svg/plus.svg";

const plusSquareIcon = document.getElementById("plus-square-icon");
const plusIcon = document.getElementById("plus-icon");

plusSquareIcon.src = PlusSquare;
plusIcon.src = PlusIcon;

let allProjectArray = [];

class Project {
  constructor(name) {
    this.name = name;
    this.list = [];
    allProjectArray.push(this);
  }
}

const defaultProject = new Project("My To-Do");

const secondProject = new Project("My Second To-Do");

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "MM-dd-yyyy");
    this.priority = priority;
    this.project = project;
    this.projectPublicName = project.name;
    project.list.push(this);
    this.completed = false;
  }
}

const firstTodo = new Todo(
  "Do Taxes",
  "Do you Taxes, man.",
  new Date(2023, 3, 15),
  2,
  defaultProject
);

const secondTodo = new Todo(
  "Clean Car",
  "Just do it",
  new Date(2023, 2, 3),
  0,
  defaultProject
);

function changeTitle(object, newTitle) {
  object.title = newTitle;
}

function changeDescription(object, newDescription) {
  object.description = newDescription;
}

function changeDueDate(object, newDueDate) {
  object.dueDate = format(newDueDate, "MM-dd-yyyy");
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
  todoItem.project.list = todoItem.project.list.filter(
    (object) => object.title != todoItem.title
  );
}

function changeProject(todoItem, newProject) {
  todoItem.project.list = todoItem.project.list.filter(
    (object) => object.title != todoItem.title
  );
  todoItem.project = newProject;
  newProject.list.push(todoItem);
  todoItem.projectPublicName = newProject.name;
}

changeProject(secondTodo, secondProject);

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
      document.getElementById("add-todo-popup").style.display = "block";
    });

  for (const item of allProjectArray) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    leftContainer.appendChild(newDiv);

    let bookIcon = document.createElement("img");
    bookIcon.src = BookIcon;
    newDiv.appendChild(bookIcon);

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
  });

// Popup for new todo - DOM

document
  .getElementById("show-todo-popup")
  .addEventListener("click", function () {
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

    console.log(document.getElementById("todo-title").value);
    // Get the input value
    // var todoName = document.getElementById("todo-title").value;

    // Log the input value to the console

    // var newTodo = new Todo(todoName);

    // You can add further processing here, like sending the data to the server

    // Reset the form
    this.reset();

    // Hide the popup
    document.getElementById("add-todo-popup").style.display = "none";
    printEverything();
  });
