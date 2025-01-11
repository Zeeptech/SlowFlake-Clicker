function saveGameData(data){
    localStorage.setItem("gameData", JSON.stringify(data));
};

function loadGameData(){
    const savedData = localStorage.getItem("gameData");
    if(savedData){
        return JSON.parse(savedData);
    }
    return {
        money: 0,
        
    }
}