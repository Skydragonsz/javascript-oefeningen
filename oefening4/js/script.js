"use strict";
document.getElementById("zoeken").onclick = function () {
    const lettersInput = document.getElementById("letters");
    const lettersFout = document.getElementById("lettersFout");
    if (lettersInput.value === "") {
        lettersFout.hidden = false;
        lettersInput.focus();
    } else {
        lettersFout.hidden = true;
        nietGevondenTonen(false);
        getData("https://jsonplaceholder.typicode.com/users", verwerkUsers, nietGevondenTonen);
    }
}

//---------------------

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

function removeAllChildren(element) {
    while (element.lastChild !== null) {
        element.lastChild.remove();
    }
}

//---------------------

function verwerkUsers(users) {
    const letters = document.getElementById("letters").value;
    const ul = document.getElementById("users");
    removeAllChildren(ul);
    for (const user of users) {
        if (user.name.includes(letters)) {
            const hyperlink = document.createElement("a");
            hyperlink.innerText = user.name;
            hyperlink.href = "details.html";
            hyperlink.dataset.id = user.id;
            hyperlink.onclick = userDetail;

            const li = document.createElement("li");
            li.appendChild(hyperlink);
            ul.appendChild(li);
        }
    }
}

//document.getElementById("letters").addEventListener("keydown", detectEnterKey);
document.getElementById("letters").onkeydown = detectEnterKey; 

function detectEnterKey(event){
    if (event.key == "Enter") { //Enter knop
        document.getElementById("zoeken").click();
    }
}

function userDetail() {
    sessionStorage.setItem("id", this.dataset.id);
}








