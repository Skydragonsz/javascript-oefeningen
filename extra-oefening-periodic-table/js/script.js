"use strict";

getData("extra/PeriodicTableJSON.json", processData, fail);


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
    console.error("Error:", event);
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const number = urlParams.get("number");


if(number != null){
    getData("extra/PeriodicTableJSON.json", processInfo, fail);
}

//not used anymore. leaving it just in case.
function makeItemsClickable(){
    const info = document.querySelector("info");

    const items = document.querySelectorAll(".item");
    
    for(const item of items){
        item.onclick = () =>{
            if(item.childNodes[0].dataset.number != null){
                let url = new URL(window.location.origin);
                url.searchParams.set("number",item.childNodes[0].dataset.number);
                
                window.location.replace(url);
            }
        }
    }
}


function processData(data){
    fillTable(data);
    makeItemsClickable();
}

function fillTable(data){
    const ol = document.querySelector(".table");
    if(data != null){
        for(const item of data.elements){

            const li = document.createElement("li");
            const ul = createUlElement(item);


            /*
            const a = document.createElement("a");
            a.href = `info.html?number=${item.number}`;
            a.target = "_blank";
            a.appendChild(ul);
            li.appendChild(a);
            */

            li.appendChild(ul);

            li.style.gridColumnStart = item.xpos;
            //li.style.gridColumnEnd = (item.xpos +1);
            li.style.gridRowStart = item.ypos;
            //li.style.gridColumnEnd = (item.ypos +1);     

            ol.appendChild(li);
        }
    }
}

function createUlElement(data){
    const ul = document.createElement("ul");
    const number = document.createElement("li");
    const atomic_mass = document.createElement("li");
    const symbol = document.createElement("li");
    const name = document.createElement("li");
    
    ul.style.backgroundColor = data["cpk-hex"] !== null ? `#${data["cpk-hex"]}`: "#ffffff";

    number.innerText = data.number;
    number.classList.add("item-number");
    number.dataset.number = data.number;

    let mass = Number(data["atomic_mass"]);
    atomic_mass.dataset.mass = mass;
    mass = Math.round((mass + Number.EPSILON) * 100) / 100;
    atomic_mass.innerText = mass;
    atomic_mass.classList.add("item-mass");

    symbol.innerText = data.symbol;
    symbol.dataset.symbol = data.symbol;
    symbol.classList.add("item-symbol");

    name.innerText = data.name;
    name.dataset.name = data.name;
    name.classList.add("item-name");


    ul.classList.add("item");
    ul.appendChild(number);
    ul.appendChild(atomic_mass);
    ul.appendChild(symbol);
    ul.appendChild(name);

    return ul;
}

function createInfo(data){
    const title = document.querySelector("article > h1");
    title.innerText = data.name;

    const img = document.querySelector("article > img");
    img.src = data.image.url;
    img.alt = data.image.title;

    const article = document.querySelector("article");
    
    createModel(data);
    
    article.appendChild(createSection("Phase:", data["phase"]));
    article.appendChild(createSection("Atomic mass:", data["atomic_mass"]));
    article.appendChild(createSection("Boiling point in kelvin:", data["boil"]));
    article.appendChild(createSection("Melting point in kelvin:", data["melt"]));
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

function processInfo(data){
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

function createModel(data){
    const model = document.querySelector("model-viewer");
    model.alt = data.summary;
    model.src = data.bohr_model_3d;
    model.poster = data.bohr_model_image;
}




