"use strict";

getData("extra/pizzas.json",processData);


async function getData(url, callback, failure = this.fail, options) {
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
            failure(response);
        }
    }catch (error){
        failure(error);
    }    
}


function fail(data){
    console.error("Failed:",data);
}

function processData(data){
    console.log(data);
    showData(data);
}

function showData(data){
    const body = document.querySelector("body");
    const ul = document.createElement("ul");

    for(const item of data.data){
        console.log(item);
        
        const li = document.createElement("li");
        const innerUl = document.createElement("ul");
        const p = document.createElement("p");

        /*
        const image = document.createElement("img");
        image.src = "/img/pizza.jpg";
        image.alt = "pizza";
        li.appendChild(image);
        */

        for(const topping of processToppings(item)){        
            const innerLi = document.createElement("li");
            innerLi.innerText = topping;
            innerUl.appendChild(innerLi);
        }

        p.innerText = `${item.name} - (${item.categoryName})`;
        li.appendChild(p);
        li.appendChild(innerUl);
        ul.appendChild(li);
    }

    body.appendChild(ul);


}

function processToppings(pizza){
    const toppins = pizza.description;
    const toppingList = toppins.split(/, | & /);
    return toppingList;
}








