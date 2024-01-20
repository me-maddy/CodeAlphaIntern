const submitBtn = document.getElementsByClassName("textBox")[0];
const display = document.getElementsByClassName("taskBox")[0];
let todo = JSON.parse(localStorage.getItem("items"));
const input = document.getElementById("inputText");
let isEdited = false;
let editId;

const showList = () => {
  let text = "";
  if (todo) {
    todo.forEach((item, id) => {
      text += `<div class="item">
            <p>${item}</p>
            <div class="btnBox">
            <button class="editBtn btn ${id}">Edit</button>
            <button class="btn doneBtn">Done</button>
            <button class="btn dltBtn ${id}">Delete</button>
            </div>
            </div>`;
    });
  }
  const innerPart = `<h3 class="taskHeading"> Your planned tasks are :</h3>`;
  display.innerHTML = innerPart + text;
  if (display.children.length == 1) {
    display.style.display = "none";
  }else if(display.children.length>1){
    display.style.display = "block";
  }
};

showList();

const addPlan = (e) => {
  e.preventDefault();
  const inputVal = input.value;
  if (!isEdited) {
    if (!todo) {
      todo = [];
    }
    todo.push(inputVal);
    // console.log(todo);
  } else {
    todo[editId] = inputVal;
    isEdited = false;
  }

  localStorage.setItem("items", JSON.stringify(todo));
  
  input.value = "";
  showList();
};

const actionPerform = (e) => {
  if (e.target.classList.contains("doneBtn")) {
    e.target.parentNode.previousElementSibling.style.textDecoration =
      "line-through";
  } else if (e.target.classList.contains("dltBtn")) {
    let arr = Array.from(e.target.classList.value).slice(11)[0];
    // console.log(arr);
    todo.splice(arr, 1);
    localStorage.setItem("items", JSON.stringify(todo));
    showList();
  } else if (e.target.classList.contains("editBtn")) {
    input.value = e.target.parentNode.previousElementSibling.textContent;
    // console.log(e.target.classList.value);
    let arr = Array.from(e.target.classList.value).slice(12);
    editId = Number(arr[0]);
    isEdited = true;
  }
};

submitBtn.addEventListener("submit", addPlan);
display.addEventListener("click", actionPerform);
