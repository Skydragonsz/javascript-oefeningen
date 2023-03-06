"use strict";
import Utils from "../module/utils.js";
import Pizza from "../module/pizza.js";

let pizzas = [];


Utils.getData("extra/pizzas.json",processData);


function processData(data){
    showData(data);
}



function showData(data){
    const main = document.querySelector("main");
    const ul = document.createElement("ul");  

    for(const item of data.data){     
        const pizza = new Pizza(item.name,item.description, item.categoryName, item.crust); 
        pizzas.push(pizza);

        const li = document.createElement("li");
        const innerUl = document.createElement("ul");
        const p = document.createElement("p");


        li.classList.add("pizza");

        for(const topping of pizza.toppings){        
            const innerLi = document.createElement("li");
            innerLi.innerText = topping.name;
            innerUl.appendChild(innerLi);
        }

        p.innerText = `${pizza.name} - (${pizza.categoryName})`;
        li.appendChild(p);
        li.appendChild(innerUl);
        ul.appendChild(li);

        console.log(pizza);
    }

    main.appendChild(ul);

}










