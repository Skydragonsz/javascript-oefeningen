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

