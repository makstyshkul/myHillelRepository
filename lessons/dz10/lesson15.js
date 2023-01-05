const state = [];

const bodyRef = document.querySelector('body');
const divRef = document.createElement('div');
const inputRef = document.createElement('input');

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


		updateLi();
}

function addItem (){
	state.push({
		text: inputRef.value,
		checked: false,
		edit: false,
		id: new Date()
	});
inputRef.value ='';


updateLi();
}

function saveEditLi(event){
	const obj = state.find( i => i.id.toString() === event.target.parentElement.dataset.id);

	obj.text = event.target.previousElementSibling.value;
	obj.edit = false;

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



addButton.addEventListener('click' ,() => {
	localStorage.setItem('li',ulRef.innerHTML)
});


clearAllButton.addEventListener('click' , () => {
	ulRef.innerHTML = '';
	localStorage.removeItem('li');
});

function toDo(){
	const toDo = localStorage.getItem('li');
if(toDo){
	ulRef.innerHTML = toDo;
}
}

toDo();
