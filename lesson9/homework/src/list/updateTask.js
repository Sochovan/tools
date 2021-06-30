import { renderTasks } from "./renderer";
import { getItem, setItem } from "./storage";
import { updateTask, getTasksList } from "./tasksGateway";

export const onToggleTask = (event) => {
  const isCheckbox = event.target.classList.contains("list-item__checkbox");

  if (!isCheckbox) {
    return;
  }

  const taskId = event.target.dataset.id;
  const taskList = getItem("tasksList");
  const { text, createDate } = taskList.find((task) => task.id === taskId);
  const done = event.target.checked;

  const updatedTask = {
    text,
    createDate,
    done,
    finishDate: done ? new Date().toISOString() : null,
  };

  updateTask(taskId, updatedTask)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem("tasksList", newTasksList);
      renderTasks();
    });
};

// 1.Prepare data
// 2. Update data in database
// 3. Readnew data from server
// 4. Save new data to front-end storage
// 5. Updated UI based on new data
