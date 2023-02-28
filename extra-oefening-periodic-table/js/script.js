"use strict";

getData("extra/PeriodicTableJSON.json",show,fail, {mode: "no-cors"});

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

function fail(){
    console.log("failed");
}



function show(data){
    const ul = document.querySelector("body > ul");
    if(data != null){
        for(const item of data.elements){
            const li = document.createElement("li");
            li.innerHTML = item.name;
            li.style.backgroundColor = `#${item["cpk-hex"]}`;
            ul.appendChild(li);
        }
    }
}




