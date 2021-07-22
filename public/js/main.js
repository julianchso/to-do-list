const deleteTask = document.querySelectorAll(".delete-todo");
const completeTask = document.querySelectorAll(".complete-task")

Array.from(deleteTask).forEach((e) => {
  e.addEventListener("click", deleteToDoFunc);
});

Array.from(completeTask).forEach((e) => {
  e.addEventListener("click", completeToDoFunc)
})

async function deleteToDoFunc() {
  console.log("Delete working!");
  const todo = this.parentNode.childNodes[1].innerText;

  try {
    const res = await fetch("deleteToDo", {
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

async function completeToDoFunc() {
  console.log("Update working!")
}
