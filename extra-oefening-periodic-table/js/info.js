"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const number = urlParams.get("number");


if(number != null){
    getData("extra/PeriodicTableJSON.json", processData, fail);
}else{
    fail("No number parameter");
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
            const data =  await response.json();
            callback(data);
        }else{
            failure(response.statusText);
        }
    }catch (error){
        failure(error);
        
    }    
}

function fail(event){
    document.querySelector("article > h1").innerText = "Not found!"
    console.error("Error:", event);
}

function processData(data){
    if(data != null){
        for(const item of data.elements){
            if(item.number == number){
                createInfo(item);
                return;
            }
            
        }

    }
    fail();
}

function createInfo(data){
    const title = document.querySelector("article > h1");
    title.innerText = data.name;

    const img = document.querySelector("article > img");
    img.src = data.image.url;
    img.alt = data.image.title;

    const article = document.querySelector("article");
    article.appendChild(createSection("Phase:", data["phase"]));
    article.appendChild(createSection("Atomic mass:", data["atomic_mass"]));
    article.appendChild(createSection("Boiling point:", data["boil"]));
    article.appendChild(createSection("Melting point:", data["melt"]));
    article.appendChild(createSection("Discovered by:", data["discovered_by"]));
    article.appendChild(createSection("Named by:", data["named_by"]));
    
    article.appendChild(createSection("Appearance:", data["appearance"]));
    
}

function createSection(header, data){
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");


    h2.innerText = header;
    section.appendChild(h2);

    if(data != null){
        p.innerText = data;
    }else{
        p.innerText = "None";
    }
    
    section.appendChild(p);

    return section;
}