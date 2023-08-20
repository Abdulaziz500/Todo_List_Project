let tasks = [
    {
        "title": "قراءة كتاب",
        "date": "15/10/2030",
        "isDone": true
    },
    {
        "title": "إنهاء المشروع النهائي",
        "date": "15/10/2030",
        "isDone": false
    },
    {
        "title": "إنهاء كورس الجافاسكريبت",
        "date": "15/10/2030",
        "isDone": false
    }
]

function getTasksFromStorage()
{
    tasks = JSON.parse(localStorage.getItem("tasks")) ?? []
}

getTasksFromStorage()

function fillTasksOnThePage()
{
    document.getElementById("tasks").innerHTML = ""

    let index = 0

    for(task of tasks)
    {
        let content =
                `
                    <!--TASK-->
                    <div class="task ${task.isDone ? "done" : ""}">

                        <!--TASKS INFO-->
                        <div style="width: 70%;">
                            <h2>${task.title}</h2>

                            <div>
                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span>
                                <span>
                                    ${task.date}
                                </span>
                            </div>
                        </div>
                        <!--TASKS INFO-->

                        <!--TASKS ACTIONS-->
                        <div style="display: flex; justify-content: space-between; align-items: center; width: 20%;">
                            <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(114,0,0); color: white;">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </button>

                            ${task.isDone ? `
                                <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(118,0,101); color: white;">
                                    <span class="material-symbols-outlined">
                                        cancel
                                    </span>
                                </button>
                            ` : `
                                <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(0,150,30); color: white;">
                                    <span class="material-symbols-outlined">
                                        done
                                    </span>
                                </button>
                            `}
                            

                            <button onclick="editTask(${index})" class="circular" style="background-color: rgba(0,16,197,0.692); color: white;">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </div>
                        <!--TASKS ACTIONS-->
                        
                    </div>
                    <!--//TASK//-->
                `

        document.getElementById("tasks").innerHTML += content
        index++
    }
}

fillTasksOnThePage()

document.getElementById("add-btn").addEventListener("click",() => {
    let now = new Date()
    let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes()
    let taskName = prompt("الرجاء إدخال عنوان المهمة")
    if(taskName)
    {
        let taskObj = {
            "title": taskName,
            "date": date,
            "isDone": false
        }
    
        tasks.push(taskObj)
        storeTasks()
        fillTasksOnThePage()

    }
})


function deleteTask(index)
{
    let task = tasks[index]
    let isConfirmed = confirm(`هل أنت متأكد من حذف مهمة : ${task.title}`)

    if(isConfirmed)
    {
        tasks.splice(index,1)
        storeTasks()
        fillTasksOnThePage()
    }
}

function editTask(index)
{
    let task = tasks[index]
    let newTaskTitle = prompt(`الرجاء تحديد عنوان المهمة الجديد`,task.title)

    if(newTaskTitle)
    {
        task.title = newTaskTitle
        storeTasks()
        fillTasksOnThePage()
    }
}


function toggleTaskCompletion(index)
{
    let task = tasks[index]
    task.isDone = !task.isDone
    storeTasks()
    fillTasksOnThePage()
}


//=======STORAGE FUNCTION========//

function storeTasks()
{
    localStorage.setItem("tasks",JSON.stringify(tasks))
}