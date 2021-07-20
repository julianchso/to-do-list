// const { json } = require("body-parser");

const deleteTask = document.querySelectorAll(".deleteToDo");

Array.from(deleteTask).forEach((e) => {
  e.addEventListener("click", deleteToDoFunc);
});

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
