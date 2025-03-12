
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0; //weapon

let fighting;

let monsterHealth;// life
=======

let monsterHealth;

let inventory = [`stick`];



let monsterHealth;
let inventory = [`stick`]; //comment


let inventory = [`stick`]; //comment

const button1 = document.getElementById("button1"); //button
const button2 = document.getElementById("button2"); //button
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 60,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    }
]

const locations = [
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the store 🏪"
    },
    {
        name: "town square",
        "button text": ["Go to Store","Go to cave","Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square 🏰"
    },
    {
        name: "cave",
        "button text": ["Fight slime","Fight fanged beast","Go to town square"],
        "button functions": [fightSlime, figthBeast, goTown],
        text: "You enter the cave and see some monsters"
    },
    {
        name: "fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting the monster"
    },
    {
        name: "kill Monster",
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster died 👾. You gained XP and Gold"
    },
    {
        name: "lose",
        "button text": ["REPALY","REPALY","REPALY"],
        "button functions": [restart, restart, restart],
        text: "You died ☠️"
    },
    {
        name: "win",
        "button text": ["REPALY","REPALY","REPALY"],
        "button functions": [restart, restart, restart],
        text: "YOU DEFEATED THE DRAGON!"
    }
]

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = `none`;
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.textContent = location.text;
}

function goStore(){
    try {
        update(locations[0]);
    } catch (error) {
        console.log(error);
    }
}

function goTown(){
    try {
        update(locations[1]);
    } catch (error) {
        console.log(error);
    }
}


function goCave(){
    try {
        update(locations[2]);
    } catch (error) {
        console.log(error);
    }
}


function buyHealth(){

    if( gold >= 10){
        gold -= 10;
        health += 10;
    
        goldText.textContent = gold;
        healthText.textContent = health;
    }
    else{
        text.textContent = `You do not have enough gold to buy Health`;
    }
}

function buyWeapon(){

    if(currentWeapon < weapons.length - 1){

        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.textContent = gold;
            let newWeapon =  weapons[currentWeapon].name;
            text.textContent = `You now have a `+ newWeapon;
            inventory.push(newWeapon);
            text.textContent = `In your inventory you have `+ inventory;
        }
        else{
            text.textContent = `You do not have enough gold to buy a Weapon`;
        }
    }
    else{
        text.textContent = `You already have the most powerful weapon`;
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }

}

function sellWeapon(){
    if( inventory.length > 1){
        gold += 15;
        goldText.textContent = gold;

        let currentWeapon = inventory.shift();
        text.textContent = `You sold a ` + currentWeapon;
        text,textContent = `In your inventory you have ${inventory}`;
    }
    else{
        text.textContent = `You can not sell your only weapon`;
    }
}


function goFigth(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.textContent = monsters[fighting].name;
    monsterHealthText.textContent = monsterHealth;
}

function dodge(){
    text.textContent = `You dodge the attack from ${monsters[fighting].name}`
}

function attack(){
    text.textContent = `The ${monsters[fighting].name} attacks`;
    text.textContent = `You attack it with your ${weapons[currentWeapon].name}`;
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1;

    healthText.textContent = health;
    monsterHealthText.textContent = monsterHealth;
    
    if(health <= 0 ){
        lose();
    }
    else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }
}


function fightSlime(){
    fighting = 0;
    goFigth();
}

function figthBeast(){
    fighting = 1;
    goFigth();
}

function fightDragon(){
    fighting = 2;
    goFigth();
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level*6.7);
    xp += monsters[fighting].level;
    goldText.textContent = gold;
    xpText.textContent = xp; 
    update(locations[4]);
}

function restart(){
    let xp = 0;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let inventory = [`stick`];

    goldText.textContent = gold;
    healthText.textContent = health;
    xpText.textContent = xp;
    goTown();
}