"use strict";
const imgDoorClosed = "img/deurtoe.png";
const imgDoorOpen = "img/deuropen.png";
const imgFound = "img/gevonden.png";
const amountDoors = 10;
let found = false;
let counter = 0;

createDoors(amountDoors);


const links = document.getElementById("deuren").childNodes;
const fries = links[Math.floor(Math.random() * amountDoors) + 1];

for (const link of links) {
    link.onclick = function (event) {
        event.preventDefault();
        if(!found) {
            counter++;
        }

        const img = this.querySelector("img");
        if (this == fries) {
            img.src = imgFound;
            img.alt = "Frieten gevonden";

            document.getElementById("beurten").innerText = counter;
            document.getElementById("resultaat").hidden = false;

            found = true;
        } else {
            img.src = imgDoorOpen;
            img.alt = "Deur open";
        }
    };
}


function createDoors(amount){
    const doorContainer = document.getElementById("deuren");
    for(let i = 1; i <= amount; i++){
        doorContainer.appendChild(createDoor());
    }
}

function createDoor(){
    const img = document.createElement("img");
    img.src = imgDoorClosed;
    img.alt = "Deur gesloten";

    const link = document.createElement("a");
    link.href = "#";
    link.appendChild(img);

    return link;
}