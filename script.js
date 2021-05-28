/*  The JavaScript file implements the functionality for the todo app.
    

/*  Step 1: locate DOM element and assign to a JavaScript variable
    --------------------------------------------------------------

    Here is a table overview of five methods you can use to access elements in 
    the DOM. The two most common are getElementById() and querySelector()

    |---------|------------------| -------------------------| ----------------|       
    |Gets     |Selector Syntax   |     Method               |     Returns     |
    |         | (used in CSS)    |                          |                 |
    |---------|------------------| -------------------------| ----------------|       
    |ID       | #example         | getElementById()         | single value    |
    |Class    | .example         | getElementsByClassName() | array of values |
    |Tag      | section          | getElementsByTagName()   | array of values |
    |Selector | .section.h1      | querySelector()          | first match     |
    |Selector | .section.h1      | querySelectorAll()       | all matches     |
    |---------|------------------| -------------------------| ----------------| */ 
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");


function saveTask(name, isCompleted){
    localStorage.setItem(name, isCompleted);
}


/* Locate where <script> tag which contains our template  */
let templateElement = document.getElementById("list-item-template");
/* Lets get the template, which is just all the HTML beteen the <script> tag */
let template = templateElement.innerHTML;


/* Step 2. Lets write the function to handle the 'click' event
---------------------------------------------------------------*/
function onAddTaskClicked(event) {
    let taskName = newTaskInput.value;
    newTaskInput.value = "";
    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('beforeend', taskHTML);
    saveTask(taskName, false);
}

function onTodolistClicked(event) {
    /* We need to know which element triggered the click event */
    let targetElement = event.target;
    while (!targetElement.classList.contains("task")) {
        targetElement = targetElement.parentElement;
    }
    let checkbox = targetElement.querySelector(".checkbox");
    if (checkbox.checked) {
        targetElement.classList.add("completed");
    } else {
        targetElement.classList.remove("completed");
    }
    console.log(targetElement);
    let taskNameElement = targetElement.querySelector(".task-name");
    let taskName = taskNameElement.innerText;
    saveTask(taskName, checkbox.checked);

}

function renderTasks(){
    for(let i =0; i < localStorage.length;i++ ){
        let taskName = localStorage.key(i);
        let isCompleted =localStorage.getItem(taskName) =="true";
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if(!isCompleted){
            todoListContainer.insertAdjacentHTML("afterbegin", taskHTML);
        }
    }
}

/* Step 3 make the event trigger our functions
-----------------------------------------------*/ 
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);
renderTasks();
