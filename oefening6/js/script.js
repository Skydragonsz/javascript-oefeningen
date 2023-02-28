"use strict";

getData("extra/verspringen.json",verwerkUitslagen,nietGevondenTonen, {mode: "no-cors"});

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


function verwerkUitslagen(uitslagen) {
    if (uitslagen.length !== 0) {
        const gemiddelde = berekenGemiddelde(uitslagen);
        const tbody = document.querySelector("tbody");
        for (const uitslag of uitslagen) {
            if (uitslag.sprong < gemiddelde) {
                voegUitslagToe(tbody, uitslag, "onderGemiddelde");
            }
        }
        const tr = tbody.insertRow();
        tr.classList.add("gemiddelde");
        const tdNaam = tr.insertCell();
        tdNaam.innerText = "GEMIDDELDE";
        const tdSprong = tr.insertCell();
        tdSprong.innerText = gemiddelde;
        for (const uitslag of uitslagen) {
            if (uitslag.sprong >= gemiddelde) {
                voegUitslagToe(tbody, uitslag, "vanafGemiddelde");
            }
        }
    }
}

function berekenGemiddelde(uitslagen) {
    return Number((uitslagen.map(uitslag => uitslag.sprong).reduce((som, sprong) => som + sprong) / uitslagen.length).toFixed(2));
}

function voegUitslagToe(tbody, uitslag, cssClass) {
    const tr = tbody.insertRow();
    tr.classList.add(cssClass);
    const tdNaam = tr.insertCell();
    tdNaam.innerText = uitslag.naam;
    const tdSprong = tr.insertCell();
    tdSprong.innerText = uitslag.sprong;
}