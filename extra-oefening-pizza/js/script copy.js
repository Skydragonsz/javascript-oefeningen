"use strict";
import getData from "../module/utils.js";

getData("extra/pizzas.json",processData);


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
    const toppingList = toppins.split(/,| & /);
    return toppingList;
}








