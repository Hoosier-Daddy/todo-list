//Selectors
const todoInput = document.getElementsByClassName('todo-input');

const addButton = document.getElementsByClassName('add-button');

const todoList = document.getElementsByClassName('todo-list');

const todoForm = document.getElementsByClassName('todo-form');

const filterOption = document.getElementById('filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
addButton[0].addEventListener('click', addTodo);
todoList[0].addEventListener('click', todoEvent);
filterOption.addEventListener('click', filterTodo);

// ****************
//  Todo List Creation
// ****************

function addTodo(e) {
	e.preventDefault();
	const item = todoInput[0].value;

	if (item == '') {
	} else {
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo-div');

		const todo = document.createElement('li');
		todo.classList.add('todo');
		todo.innerHTML = item;
		todoDiv.appendChild(todo);

		saveLocalTodos(item);

		const completeButton = document.createElement('button');
		completeButton.classList.add('complete-button');
		completeButton.innerHTML = '<i class="fa fa-check i-event-null"></i>';
		todoDiv.appendChild(completeButton);

		const trashButton = document.createElement('button');
		trashButton.classList.add('trash-button');
		trashButton.innerHTML = '<i class="fa fa-trash i-event-null" ></i>';
		todoDiv.appendChild(trashButton);

		todoList[0].appendChild(todoDiv);

		todoInput[0].value = '';
	}
}

// ****************
//  Todo Events
// ****************

function todoEvent(event) {
	if (event.target.classList[0] == 'trash-button') {
		const item = event.target.parentElement;
		item.classList.add('fall');
		removeLocalTodos(item);

		item.addEventListener('transitionend', function() {
			item.remove();
		});
	} else if (event.target.classList[0] == 'complete-button') {
		event.target.parentElement.classList.toggle('completed');
	}
}

function filterTodo(event) {
	const todos = todoList[0].childNodes;

	todos.forEach(function(todo) {
		switch (event.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;

			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;

			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}



function saveLocalTodos(todo){
//CHECK----Hey Di i aready have thing in there?
	let todos;

	if(localStorage.getItem('todos')=== null){
		todos=[];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos(){

	let todos;
	if(localStorage.getItem('todos')=== null){
		todos=[];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach(function(todoText){

		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo-div');

		const todo = document.createElement('li');
		todo.classList.add('todo');
		todo.innerHTML = todoText;
		todoDiv.appendChild(todo);


		const completeButton = document.createElement('button');
		completeButton.classList.add('complete-button');
		completeButton.innerHTML = '<i class="fa fa-check i-event-null"></i>';
		todoDiv.appendChild(completeButton);

		const trashButton = document.createElement('button');
		trashButton.classList.add('trash-button');
		trashButton.innerHTML = '<i class="fa fa-trash i-event-null" ></i>';
		todoDiv.appendChild(trashButton);

		todoList[0].appendChild(todoDiv);

	})
	
}


function removeLocalTodos(todo){

	let todos;
	if(localStorage.getItem('todos')=== null){
		todos=[];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos));

}