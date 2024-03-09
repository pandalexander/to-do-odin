import _, { first } from "lodash";
import "./style.css";
// import { Project, ToDo } from "./build-project.js";
import { compareAsc, format } from "date-fns";

const allProjectArray = [];

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

changePriority(firstTodo, 1);
console.log(firstTodo);
