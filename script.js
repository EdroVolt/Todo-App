"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};

const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};

const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const creatOption = function(item, priority){
  return `<option ${priority == item ? "selected" : ""} value="${item}">${getPriorityName(String(item))}</option>`;
}

// hide edit button and display save & cancel buttons
const switchButtons = function(element){
  element.style.display = "none"
  const td = element.parentElement;
  td.querySelector(".btn-save").style.display = "inline"
  td.querySelector(".btn-cancle").style.display = "inline"
}

const editTask = function(element, i) {
  const task  = tasks[i];
  const row = element.parentElement.parentElement;
  const children = row.children;
  
  children[1].innerHTML = `<input type="text" class="form-control" value=${task.name} />`;
  children[2].innerHTML = `<select class="form-control">
                            <!-- NTOE: create periority options while keeping track for the last selected one  -->
                            ${[1, 2, 3].map(item => creatOption(item, task.priority))}
                          </select>`;

  switchButtons(element);
}

const saveTask = function(element, i) {
  const task  = tasks[i];
  const row = element.parentElement.parentElement;
  const children = row.children;

  // save new name and periority values
  task.name = children[1].firstElementChild.value;
  task.priority = children[2].firstElementChild.value;

  renderTable();
}


const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
          <td>${i + 1}</td>
          <td class="name">${t.name}</td>
          <td class="priority">${getPriorityName(t.priority)}</td>
          <td>
            ${
              i > 0
                ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
                : ``
            }
            ${
              i < tasks.length - 1
                ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
                : ``
            }
          </td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="editTask(this, ${i})">Edit</button>
            <button class="btn btn-success btn-sm btn-save" onclick="saveTask(this, ${i})" style="display:none;">Save</button>
            <button class="btn btn-danger btn-sm btn-cancle" onclick="renderTable()" style="display:none;">Cancel</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button>
          </td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};

const addTask = function () {
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);
