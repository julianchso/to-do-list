const deleteTask = document.querySelectorAll(".deleteToDo");

Array.from(deleteTask).forEach((e) => {
  e.addEventListener("click", deleteToDo);
});

async function deleteToDo() {
  console.log("Delete working!");
}
