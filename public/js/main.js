const deleteTask = document.querySelectorAll(".delete-todo");
const completeTask = document.querySelectorAll(".incomplete");
const incompleteTask = document.querySelectorAll(".complete");

Array.from(deleteTask).forEach((e) => {
  e.addEventListener("click", deleteToDoFunc);
});

Array.from(completeTask).forEach((e) => {
  e.addEventListener("click", completeToDoFunc);
});

Array.from(incompleteTask).forEach((e) => {
  e.addEventListener("click", incompleteToDoFunc);
});

async function completeToDoFunc() {
  console.log("Update working!");
  const todoId = this.parentNode.dataset.id;
  console.log(todoId);

  try {
    const res = await fetch("markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoId: todoId,
      }),
    });
    const data = await res.json();
    console.log(data);
    // location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function incompleteToDoFunc() {
  console.log("Incomplete task");
  const todoId = this.parentNode.dataset.id;

  console.log(todoId);

  try {
    const res = await fetch("markIncomplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoId: todoId,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function deleteToDoFunc() {
  console.log("Delete working!");
  const todoId = this.parentNode.dataset.id;
  console.log(todoId);

  try {
    const res = await fetch("deleteToDo", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoId: todoId,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}