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

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "MM-dd-yyyy");
    this.priority = priority;
    this.project = project;
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
  todoItem.project = newProject;
}

function deleteProject(project) {
  allProjectArray = allProjectArray.filter(
    (object) => object.name != project.name
  );
}
