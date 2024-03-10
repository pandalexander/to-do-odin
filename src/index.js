import _, { first } from "lodash";
import "./style.css";
// import { Project, ToDo } from "./build-project.js";
import { compareAsc, format } from "date-fns";

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

function printAllProjects() {
  document.body.innerHTML = "";
  for (const item of allProjectArray) {
    let newItem = document.createElement("h1");
    newItem.textContent = item.name;
    body.appendChild(newItem);

    for (let i = 0; i < item.list.length; i++) {
      for (const property in item.list[i]) {
        let newProp = document.createElement("p");
        newProp.textContent = `${property}: ${item.list[i][property]}`;
        body.appendChild(newProp);
      }
    }
  }
}
