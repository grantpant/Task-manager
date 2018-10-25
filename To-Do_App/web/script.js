var todoUrl = 'http://localhost:3000/todos/';

$(document).ready(function() {
    $.ajax({ 
        url: todoUrl, 
        method: 'GET' 
    }).then(function(todos) { // 1st param ("todos") is the array of data returned from the GET request. (you can name it whatever you want.) 
        console.log(todos); 
        todos.forEach(function(todo) { // 1st param ("todo") is the current object of the array "todos." (you can name it whatever you want.)
            let completedClassString = todo.isComplete? "completed": "";
            // console.log(todo.description);
            $('ul').append(
                "<li data-id=" + todo.id + " class=" + completedClassString + "><span>" + "<i class='fa fa-times'></i></span>" + todo.description + "</li>");
        });
    });
});


// Toggle the Todo as completed
$('ul').on('click', 'li', function() {
    let that = this;
    let thisId = $(this).attr('data-id');
    console.log(thisId);
    $.ajax({
        url: todoUrl + thisId,
        method: 'PUT'
    }).fail(function() {
        return false;
    }).done(function() {
        $(that).toggleClass('completed');
    })
});

// DELETE a Todo
$('ul').on('click', 'span', function(event) {
    event.stopPropagation();
    $(this).parent().remove();
});


// CREATE a new To-do
$('input').keypress(function(event) {
    if(event.which === 13) {
        let that = this;

        /* // In case you need to assign the id from here
        let lastTodoId = parseInt($('ul').children().last().attr('data-id'));
        let thisTodoId = lastTodoId + 1;
        console.log(thisTodoId);
        */

        $.ajax({
            url: todoUrl,
            method: 'POST',
            data: {
                // id: lastTodoId + 1,
                description: $(that).val(),
            }
        })
        .fail(function(){
            return false;
        })
        .done(function(todoItem){
            $('ul').append(
                "<li data-id=" + todoItem.id + ">" +
                    todoItem.description + 
                    "<span>" +
                        "<i class='fa fa-times'></i>" +
                    "</span>" +
                "</li>"
            );
            $(that).val('');           
        });
    }
});




