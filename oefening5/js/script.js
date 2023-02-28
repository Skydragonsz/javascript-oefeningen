"use strict";
let grootsteHoogte = 0;
let alleSprongen = [];

document.getElementById("toevoegen").onclick = function () {
    if (checkValid()) {
        insertData();
        calcTop();
        clearInput();
    }
};
function checkValid() {
    const verkeerdeElementen = document.querySelectorAll("input:invalid,select:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.id}Fout`).hidden = false;
    }


    const correcteElementen = document.querySelectorAll("input:valid,select:valid");
    for (const element of correcteElementen) {
        document.getElementById(`${element.id}Fout`).hidden = true;
    }


    return verkeerdeElementen.length == 0;
}

function insertData() {
    const tbody = document.querySelector("tbody");
    const tr = tbody.insertRow();
    const naamTd = tr.insertCell();

    naamTd.innerText = document.getElementById("naam").value;
    const hoogteTd = tr.insertCell();

    const hoogte = Number(document.getElementById("hoogte").value);

    alleSprongen.push(hoogte);
    hoogteTd.innerText = hoogte;

    if (hoogte > grootsteHoogte) {
        grootsteHoogte = hoogte;
    }
    tr.insertCell();
}

function calcTop(){
    const tempSorted = alleSprongen.sort(compareNumbersDesc);
    for(let top = 0; top < tempSorted.length; top++){
        for (const tr of document.querySelector("tbody").rows) {
            const hoogte = Number(tr.cells[1].innerText);
            if(hoogte == tempSorted[top]){
                tr.cells[2].innerText = `#${(top + 1)}`;
            }
        }
    }
}


function clearInput(){
    for(let i = 0; i < document.getElementsByTagName("input").length; i++){
        document.getElementsByTagName("input")[i].value = "";
    }
    document.getElementsByTagName("input")[0].focus();  
}

function compareNumbersDesc(a, b) {
    return b - a;
}