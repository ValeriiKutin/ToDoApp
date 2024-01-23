const addNewTask = document.getElementById("open-task-form-btn");
const taskForm = document.getElementById("task-form");

const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const taskContainer = document.getElementById("task-container");

const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");

const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");

const taskData = JSON.parse(localStorage.getItem("data")) || [];

let currentTask = {};

const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  taskContainer.innerHTML = "";
  taskData.forEach(({ id, title, date, description }) => {
    return (taskContainer.innerHTML += `
      <div class="task" id=${id}>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn edit">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn delete">Delete</button>
      </div>
    `);
  });
};

const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  currentTask = taskData[dataArrIndex];
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;
  addOrUpdateTaskBtn.textContent = "Update Task";
  taskForm.classList.toggle("hidden");
};

const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};

if (taskData.length) {
  updateTaskContainer();
}

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

addNewTask.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  if (formInputsContainValues && formInputValuesUpdated) {
    console.log("formInputsContainValues", formInputsContainValues);
    console.log("formInputValuesUpdated", formInputValuesUpdated);
    console.log("currenttaskTITLE: ", currentTask.title);
    console.log("titleInput.value: ", titleInput.value);
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addOrUpdateTask();
});
