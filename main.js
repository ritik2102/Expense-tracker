const amountInput=document.querySelector('#amount');
const descriptionInput=document.querySelector('#description');
const categoryInput=document.querySelector('#category');
const expenseList=document.querySelector('.expenseList');


function submitHandler(e){
// preventing the form refresh
    e.preventDefault();
    
    const amount=amountInput.value;
    const description=descriptionInput.value;
    const category=categoryInput.value;
    

    amountInput.value='';
    descriptionInput.value='';
    categoryInput.value='';
    //Creating the li
    const li=document.createElement('li');
    //We are forming a string using all the three categories to really differentiate it
    const className=`${amount}${description}${category}`;

    li.classList.add(className);
    // Adding text to li
    li.appendChild(document.createTextNode(`${amount} - ${description} - ${category}`));
    // Creating a button and adding it at the end of li
    const deleteB=document.createElement('button');

    // Adding the delete handler on the delete button
    deleteB.onclick=()=>{
        localStorage.removeItem(className);
        expenseList.removeChild(li);
    }
    // Adding text on button
    deleteB.appendChild(document.createTextNode('Delete Expense'));
    // Adding button at the end of li tag
    li.appendChild(deleteB);

    const edit=document.createElement('button');
    edit.onclick=()=>{
        const retrieved_obj=JSON.parse(localStorage.getItem(className));
        amountInput.value=retrieved_obj.amount;
        descriptionInput.value=retrieved_obj.description;
        categoryInput.value=retrieved_obj.category;

        localStorage.removeItem(className);
        expenseList.removeChild(li);
    }
    edit.appendChild(document.createTextNode('Edit expense'));
    li.appendChild(edit);

    // Adding new li to our page
    expenseList.appendChild(li);

    const data={
        "amount":amount,
        "description":description,
        "category":category
    }

    // Storing the data witn key and value in local storage
    localStorage.setItem(className,JSON.stringify(data));
}


