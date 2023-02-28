"use strict"; 
const id = sessionStorage.getItem("id"); 


getData(`https://jsonplaceholder.typicode.com/users/${id}`, verwerkUser, nietGevondenTonen);
getData(`https://jsonplaceholder.typicode.com/todos?userId=${id}`, verwerkTodos, nietGevondenTonen);

function verwerkUser(user) { 
    document.getElementById("name").innerText = user.name; 
    document.getElementById("city").innerText = user.address.city; 
}


async function getData(url, callback, failure, options) {
    let response; 

    try{
        if(options != null){
            response = await fetch(url, options);
        }else{
            response = await fetch(url);
        }

        if (response.ok) {
            let data =  await response.json();
            callback(data);
        }else{
            failure();
        }
    }catch (error){
        failure();
        console.error("Something broke:", error);
    }    
}

function nietGevondenTonen(tonen = true){
    if (tonen){
        document.getElementById("nietGevonden").hidden = false;
    }else{
        document.getElementById("nietGevonden").hidden = true;
    }
}

function verwerkTodos(todos){
    const completedUl = document.getElementById("completed");
    const uncompletedUl = document.getElementById("uncompleted");
    for(const todo of todos){
        const li = document.createElement("li");
        li.innerText = todo.title;

        if(todo.completed){
            completedUl.appendChild(li);
        }else{
            uncompletedUl.appendChild(li);
        }
    }

}
