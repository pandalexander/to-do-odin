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
      console.log(item.list[i]);
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
