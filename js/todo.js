var taskArr = [];

//create task
$('#addNew').on('click', function () {
    itemValue = $('#task').val();

    if (itemValue != "") {
        taskArr.push({ 'taskName': itemValue, 'completeStatus': false });
        window.localStorage.setItem("task", JSON.stringify(taskArr));
    }
    showTask();
    $('#task').val('');
})

showTask();

//show task
function showTask() {
    let storeTask = window.localStorage.getItem("task");
    if (storeTask == null) {
        taskArr = [];
    }
    else {
        taskArr = JSON.parse(storeTask);
    }

    let html = '';
    taskArr.forEach((item, index) => {

        if (item.completeStatus == false) {
            complete = '<td><input type="checkbox" onclick="completeTask(' + index + ')"></td>';
            taskValue = '<td>' + item.taskName + '</td>';
        } else {
            complete = '<td><input type="checkbox" onclick="completeTask(' + index + ')" checked></td>';
            taskValue = '<td style="text-decoration: line-through">' + item.taskName + '</td>';
        }
        var id = index + 1;

        html += '<tr><th>' + id + '</th>' + taskValue + complete + '<td><button type="button" onclick="deleteTask(' + index + ')" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td></tr>';
    });

    $('#list').html(html)
}

//complete task
function completeTask(index) {
    let storeTask = window.localStorage.getItem("task");
    taskArr = JSON.parse(storeTask);
    if (taskArr[index].completeStatus == false) {
        taskArr[index].completeStatus = true
    } else {
        taskArr[index].completeStatus = false;
    }
    localStorage.setItem("task", JSON.stringify(taskArr));
    showTask();
}

//delete task
function deleteTask(index) {
    taskArr.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(taskArr));
    showTask();
}


