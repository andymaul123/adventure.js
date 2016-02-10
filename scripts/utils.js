function canBeIdentifiedByName() {
    var name;

    function getName() {
        return name;
    }

    function setName(newName) {
        this.name = newName;
    }
}

var descriptors = {
    printName : function() {
        console.log('I have a name...');
    },

    printDescription : function() {
        console.log('I have a description!');
    }
};

var healthValues = {
//    this.isAlive = true;
//    this.currentHealth = 10;
//
//    subtractHealth : function (healthLost) {
//        currentHealth -= healthLost;
//
//        if(currentHealth <= 0)
//            isAlive = false;
//
//        console.log("Health: ", currentHealth);
//        console.log("Alive = ", isAlive);
//    }
};

function Person(){
}

_.extend(Person.prototype, descriptors);
_.extend(Person.prototype, healthValues);

function Wizard(age) {
    this.age = age;
}

Wizard.prototype = Object.create(Person.prototype);
Wizard.prototype.constructor = Wizard;