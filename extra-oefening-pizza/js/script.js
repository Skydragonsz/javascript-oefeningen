"use strict";
import Utils from "../module/utils.js";
import Pizza from "../module/pizza.js";


Utils.getData("extra/pizzas.json",processData);


function processData(data){
    console.log(data);
    showData(data);
    test(data);
}

function test(data){
    for(const item of data.data){
        console.log(new Pizza(item.name,item.description, item.categoryName, item.crust));
    }
}

function showData(data){
    const main = document.querySelector("main");
    const ul = document.createElement("ul");



    

    for(const item of data.data){      
        const li = document.createElement("li");
        const innerUl = document.createElement("ul");
        const p = document.createElement("p");


        /*
        const image = document.createElement("img");
        image.src = "/img/pizza.jpg";
        image.alt = "pizza";
        li.appendChild(image);
        */

        li.classList.add("pizza");

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

    main.appendChild(ul);


}

function processToppings(pizza){
    const toppins = pizza.description;
    const toppingList = toppins.split(/,| & /);
    return toppingList;
}








