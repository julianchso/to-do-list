const deleteTask = document.querySelectorAll(".delete-todo");
const taskComplete = document.querySelectorAll(".complete");
const incompleteTask = document.querySelectorAll(".incomplete");

Array.from(deleteTask).forEach((e) => {
  e.addEventListener("click", deleteToDoFunc);
});

Array.from(taskComplete).forEach((e) => {
  e.addEventListener("click", markComplete);
});

async function deleteToDoFunc() {
  console.log("Delete working!");
  const todo = this.parentNode.childNodes[1].innerText;

  try {
    const res = await fetch("deletetodo", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todo: todo,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  console.log("Update working!");
  const todo = this.parentNode.childNodes[1].innerText;

  try {
    const res = await fetch("markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todo: todo,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
