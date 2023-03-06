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
        this.crustList.push(crusts);
        this.toppings.push(this.#processToppings(description));
    }

    #processToppings(description){
        return description.split(/, | & /);
    }


}

export default Pizza;