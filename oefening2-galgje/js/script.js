"use strict";
let gekozenWoord; 
let puntjes;
let foutePogingen = 0;

getData("extra/sauzen.json",processData, failedToGetData, {mode: 'no-cors'});



async function getData(url, callback, failure, options) {
    let response;
    
    if(options != null){
        response = await fetch(url, options);
    }else{
        response = await fetch(url);
    }
    

    try{
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

function processData(data){
    if (data != null) {
        const woordLijst = data;
        gekozenWoord = woordLijst[Math.floor((Math.random() * woordLijst.length))];
        puntjes = ".".repeat(gekozenWoord.length);
        document.getElementById("puntjes").innerText = puntjes;
    }
}

function failedToGetData(){
    document.getElementById("nietGevonden").hidden = false;
}

document.getElementById("raden").onclick = function () {
    const letterInput = document.getElementById("letter");

    if (letterInput.value == "") {
        letterInput.focus();
    } else {
        gok(letterInput.value);
        document.getElementById("puntjes").innerText = puntjes;
        document.getElementById("foutePogingen").src = `img/${foutePogingen}.png`;
        if (gewonnen()) {
            document.getElementById("gewonnenSaus").innerText = gekozenWoord;
            document.getElementById("gewonnen").hidden = false;
        } else {
            if (verloren()) {
                document.getElementById("verlorenSaus").innerText = gekozenWoord;
                document.getElementById("verloren").hidden = false;
            } else {
                letterInput.value = "";
                letterInput.focus();
            }
        }
    }
};

document.getElementById("letter").addEventListener("keydown", detectEnterKey);

function detectEnterKey(event){
    if (event.key == "Enter") { //Enter knop
        document.getElementById("raden").click();
    }
}

document.getElementById("opnieuw").onclick = function () {
    location.reload();
}

function gok(letter) {
    const oudePuntjes = puntjes;
    puntjes = "";

    if (!gekozenWoord.includes(letter)) {
        if(!verloren()){
            foutePogingen++;
        }else{
            document.getElementById("raden").hidden = true;
            document.getElementById("opnieuw").hidden = false;
            document.getElementById("letter").disabled = true;
        }
    }

    for (let teller = 0; teller != gekozenWoord.length; teller++) {
        puntjes += letter === gekozenWoord[teller] ? letter : oudePuntjes[teller];
    }
}

function verloren() {
    return foutePogingen === 10;
}
function gewonnen() {
    return !puntjes.includes(".");
}
