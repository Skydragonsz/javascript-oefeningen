"use strict";

getData("https://jsonplaceholder.typicode.com/users", verwerkUsers, nietGevondenTonen);

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
    }catch{
        failure();
    }    
}

function nietGevondenTonen(tonen = true){
    if (tonen){
        document.getElementById("nietGevonden").hidden = false;
    }else{
        document.getElementById("nietGevonden").hidden = true;
    }
}


function verwerkUsers(users) {
    const ul = document.getElementById("users");
    for (const user of users) {

        const hyperlink = document.createElement("a");
        hyperlink.innerText = user.name;
        hyperlink.href = "#";
        hyperlink.dataset.id = user.id;
        hyperlink.onclick = toonAlbums;

        const li = document.createElement("li");
        li.appendChild(hyperlink);
        ul.appendChild(li);
    }
}

async function toonAlbums() {
    document.getElementById("userEnAlbum").hidden = false;
    document.getElementById("userName").innerText = this.innerText;

    getData(`https://jsonplaceholder.typicode.com/albums?userId=${this.dataset.id}`, verwerkAlbums, nietGevondenTonen);
}


function verwerkAlbums(albums) {
    nietGevondenTonen(false);
    const ul = document.getElementById("albums");
    removeAllChildren(ul);
    for (const album of albums) {
        const li = document.createElement("li");
        li.innerText = album.title;
        ul.appendChild(li);
    }
}
function removeAllChildren(element) {
    while (element.lastChild !== null) {
        element.lastChild.remove();
    }
}