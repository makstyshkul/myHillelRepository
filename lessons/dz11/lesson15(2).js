let state = [];

const bodyRef = document.querySelector('body');
const divRef = document.createElement('div');
divRef.id = 'todo';
const inputRef = document.createElement('input');
inputRef.placeholder = 'type here';
inputRef.type = 'text';

divRef.appendChild(inputRef);
bodyRef.appendChild(divRef);

const addButton = document.createElement('button');
addButton.innerText = 'add';
divRef.appendChild(addButton);
addButton.addEventListener('click', addItem);


const clearAllButton = document.createElement('button');
clearAllButton.innerText = 'clear all';
divRef.appendChild(clearAllButton);
clearAllButton.addEventListener('click', clearAll);

const searchRef = document.createElement('input');
searchRef.placeholder = 'search';

const btnSearch = document.createElement('button');
btnSearch.innerText = 'search';
btnSearch.addEventListener('click',searchItem);

divRef.append(searchRef,btnSearch);

const inputRadio1Ref = document.createElement('input');
inputRadio1Ref.type = 'radio';
inputRadio1Ref.name = 'sort';
inputRadio1Ref.value = 'sort min to max'
const p1Ref = document.createElement('p').innerText = 'sort min to max';
divRef.append(inputRadio1Ref,p1Ref);

const inputRadio2Ref = document.createElement('input');
inputRadio2Ref.type = 'radio';
inputRadio2Ref.name = 'sort';
inputRadio2Ref.value = 'sort max to min'
const p2Ref = document.createElement('p').innerText = 'sort max to min';
divRef.append(inputRadio2Ref,p2Ref);

const ulRef = document.createElement('ul');
divRef.appendChild(ulRef);



function updateLi() {

	ulRef.innerHTML = '';
	
	state.forEach((i) => {

		if(i.edit){
			const item = editLi(i);
			ulRef.append(item);
		}else{
			const item = createLi(i);
		ulRef.append(item);
		}
		
	});



};

function createLi(obj){
	const liRef = document.createElement('li');
	liRef.dataset.id = obj.id;
	liRef.innerText = obj.text;
	ulRef.appendChild(liRef);

	

	const inputCheckBox = document.createElement('input');
	inputCheckBox.type = 'checkbox';
	if(obj.checked === true){
		inputCheckBox.checked = 'checked';
	}

	const buttonEdit = document.createElement('button');
	buttonEdit.innerText = 'edit';
	buttonEdit.addEventListener('click', editHandler);


	const buttonRemove = document.createElement('button');
	buttonRemove.innerText = 'remove';
	buttonRemove.addEventListener('click', removeHandler);

	liRef.append(inputCheckBox, buttonEdit, buttonRemove);


	return liRef
}




function editHandler(event) {

	const obj = state.find( i => i.id.toString() === event.target.parentElement.dataset.id);


	obj.edit = true;

	const editableLi = editLi(obj);
	

	event.target.parentElement.parentElement.replaceChild(editableLi,event.target.parentElement);


}

function editLi(obj){
	const editLi = document.createElement('li');
	editLi.dataset.id = obj.id;
ulRef.appendChild(editLi);

	const editInput = document.createElement('input');
	editInput.value = obj.text;

	const editSave = document.createElement('button');
	editSave.innerText = 'save';
	editSave.addEventListener('click',saveEditLi);

	const editCancel = document.createElement('button');
	editCancel.innerText = 'cancel';
	editCancel.addEventListener('click',	cancelEdit);

	editLi.append(editInput, editSave, editCancel);
	

	return editLi;


}

function removeHandler(event) {
	const index = state.findIndex( i => i.id.toString() == event.target.parentElement.dataset.id);
	state.splice(index,1);
		event.target.parentElement.remove();

		deleteData(state[index].id);

		updateLi();
}

// function addItem (){

// 	const res = addData(inputRef.value);
// 	res.then(data => state.push(fillData(data)))
// 	.then(() => updateLi());

// inputRef.value ='';

// }

async function addItem() {
	const res = await addData(inputRef.value);

	if(res){
	state.push(fillData(res));

	updateLi();
	inputRef.value ='';
	}
	
	
}

function saveEditLi(event){
	const obj = state.find( i => i.id.toString() === event.target.parentElement.dataset.id);

	obj.text = event.target.previousElementSibling.value;
	obj.edit = false;

	const index = state.findIndex( i => i.id.toString() == event.target.parentElement.dataset.id);
	state[index].text = event.target.previousElementSibling.value;

	updateData(state[index].id);


	updateLi();
	

}



function cancelEdit(event){
	const obj = state.find( i => i.id.toString() === event.target.parentElement.dataset.id);
	obj.edit = false;
	updateLi();
}

function clearAll(){

	ulRef.innerHTML = '';
	state.length = 0;

}


function fillData (item){
return ({text:item.title, id:item.id, checked: item.completed, edit:false});
}


	function loadData(){
		fetch('https://jsonplaceholder.typicode.com/users/1/todos')
.then(response => response.json())
.then(todos => 	todos.map(fillData))
	.then(mapTodo => state = mapTodo)
	.then(() => updateLi())
	//.then(() => updateData(3))
	.catch(err => alert(err.message))
	}

	loadData();


	function updateData (id) {
		const item = state.find(item => item.id === id);
		console.log(item);
	fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
	method: 'PUT',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		title: item.text,
		id: item.id,
		completed: item.checked,
	}),
	})
	.then(data => {
		if(!data.ok){
			throw new Error(data.status)
		}else{
			return data
		}
	})
	.catch(err => alert(err.message))
}

function deleteData (id) {
fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
	method: 'DELETE',
})
}

function addData (text) {
return fetch('https://jsonplaceholder.typicode.com/todos', {
	method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
	title: text,
	completed: false,
}),
})
.then(response => response.json())
.catch(err => alert(err.message))
}



function searchItem(){
	state.forEach((i) =>{
				if(searchRef.value === i.text){
			ulRef.innerHTML = '';
			createLi(i);
		}
	});
	searchRef.value = '';
}



inputRadio1Ref.onfocus = function (){

	let sort = 	state.sort((a,b) =>{
	return(a.id - b.id);
	});

	state = sort;
		updateLi();
}
inputRadio2Ref.onfocus = function() {
	let sort =	state.sort((a,b) =>{
		return	(b.id - a.id);
		});

		state = sort;
		updateLi();

}


function clickOnText(){
	fetch('https://jsonplaceholder.typicode.com/users/1/todos')
	.then(response => response.json())
.then(todos =>	todos.map(fillData))
.then(i => {
	const li = document.querySelectorAll('li');	
	li.forEach(item => {
		item.onclick = function(event) {
			const index = i.findIndex( i => i.id == event.target.dataset.id);
	item.append(JSON.stringify(i[index]));
		}
	})
	})
}

	clickOnText();



