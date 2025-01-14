let money = 0;
const displayMoney = document.getElementById("purse");
const CLICKSPEED = 1;
let moneyPerClick = 1;


// Clicker-Element
const clicker = document.getElementById("clicker-object");

clicker.addEventListener("click", (event) => {
    money+= moneyPerClick;
    createFloatingText(moneyPerClick, event.clientX, event.clientY);
    createSnowFall();
    updateMoney();
});

function updateMoney(){
    displayMoney.innerHTML = `Money: ${parseFloat(money.toFixed(1)).toLocaleString("en-US")}`
};


class ClickerType {
    constructor(name, clicksPerSec, basePrice, multiplier, onClick, icon) {
        this.name = name; 
        this.clicksPerSec = clicksPerSec; 
        this.basePrice = basePrice;
        this.multiplier = multiplier;
        this.onClick = onClick;
        this.icon = icon;
        this.owned = 0;
    }

    getPrice() {
        return Math.floor(this.basePrice * Math.pow(this.multiplier, this.owned));

    }

    startAuto() {
        setInterval(() => {
        money += this.clicksPerSec * this.owned;
        updateMoney();
        }, CLICKSPEED);
    }
}

//Array med Vilka typer av autoclicker du kan köpa
const ClickerTypes = [
    new ClickerType("Pekare", 0, 50, 2.5, "upgrade", "assets/img/pointer.svg"),
    new ClickerType("Tummhandskar", .3, 10, 1.4, "auto", "assets/img/mitten.svg"),
    new ClickerType("Spade", 1, 40, 1.5, "auto", "assets/img/shovel.svg"),
    new ClickerType("Snöskoter", 3, 500, 1.6, "auto", "assets/img/snowmobile.svg"),
    new ClickerType("Tomtens Släde", 40, 8000, 1.8, "auto", "assets/img/sleigh.svg"),
    new ClickerType("Jultomten", 100, 1000000, 2, "auto", "assets/img/santa.svg")
    ];


function buyUpgradeClick(typeIndex){
    const type = ClickerTypes[typeIndex];
    const price = type.getPrice();

    if (money >= price) {
        money -= price;
        type.owned++;
        moneyPerClick *= 2;
        
        updateStorage(type);
        updateMoney();
        console.log(`Uppgraderade ${type.name} ${type.owned} gånger`);

        } else {
        console.log("Du har inte tillräckligt med pengar för detta köp!.");
    }
};

function buyAutoClicker(typeIndex) {
    const type = ClickerTypes[typeIndex];
    const price = type.getPrice();

    
    if (money >= price) {
        money -= price;
        type.owned++;
        type.startAuto();
        
        updateStorage(type);
        updateMoney();
        console.log(`Du har köpt en ${type.name} Du har: ${type.owned}`);

        } else {
        console.log("Du har inte tillräckligt med pengar för detta köp!.");
    }
  };


// Butik för Autoklickers
const store = document.getElementById("store");

function generateButton(type, index){

    const button = document.createElement("div");
    const icon = document.createElement("img");
    const textWrapper = document.createElement("span");
    textWrapper.display = "grid";
    const text = document.createElement("div");

    const price = document.createElement("div");
    icon.src = type.icon;
    button.className = "button"; 
    button.style.userSelect = "none"
    icon.style.pointerEvents = "none";
    text.innerText = `Köp ${type.name}:`; 
    price.innerText = `${type.getPrice().toLocaleString("en-US")}`;

    button.addEventListener("click", () => {
        if (type.onClick === "auto"){
            buyAutoClicker(index); 
            price.innerText = `${type.getPrice().toLocaleString("en-US")}`;

        } else if (type.onClick === "upgrade"){
            buyUpgradeClick(index);
            price.innerText = `${type.getPrice().toLocaleString("en-US")}`;
        }
    
    });

    textWrapper.appendChild(text);
    textWrapper.appendChild(price);

    button.appendChild(textWrapper);
    button.appendChild(icon);

    store.appendChild(button);
};

ClickerTypes.forEach((type, index) => {
    generateButton(type, index, buyAutoClicker)
});

// Innehav av autoclickers
function updateStorage(type){
    const storage = document.getElementById("storage");
    let storageItem = document.getElementById(`${type.name}`);

    if(!storageItem){
        storageItem = document.createElement("div");
        storageItem.id = `${type.name}`

        const icon = document.createElement("img");
        icon.src = type.icon;
        icon.style.width = "30px";
        icon.style.height = "30px";
        const text = document.createElement("span");
        text.innerText = `x${type.owned}`

        storageItem.appendChild(icon);
        storageItem.appendChild(text);
        storage.appendChild(storageItem);
    } else {
        const count = storageItem.querySelector("span");
        if (count) {
            count.innerText = `x${type.owned}`;
        }
    };

};



updateMoney();