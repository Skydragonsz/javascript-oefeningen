"use strict";
import Crust from "../module/crust.js";
import Topping from "../module/topping.js";

class Pizza{
    name;
    description;
    toppings = [];
    crustList = [];
    categoryName;

    constructor(name, description, categoryName, crusts){
        this.name = name;
        this.description = description;
        this.categoryName = categoryName;

        
        this.crustList = this.#processCrusts(crusts);
        this.toppings = (this.#processToppings(description));
    }

    #processToppings(description){
        let tempList = [];
        for(const topping of description.split(",")){
            tempList.push(new Topping(topping));
        }

        const tempTopping = tempList[tempList.length - 1].name;
        tempList.pop();
        for(const item of tempTopping.split("&")){
            tempList.push(new Topping(item));
        }

        return tempList;
    }


    #processCrusts(crusts){
        let tempList = [];
        for(const crust of crusts){
            tempList.push(new Crust(crust.name, crust.description));
        }
        return tempList;
    }

}

export default Pizza;