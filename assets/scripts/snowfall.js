const SNOWFALLAMOUNT = 50;

function createSnowFall(){
    const snowFall = document.createElement("img");
    const snowFallContainer = document.getElementById("snowFallContainer");

    const snowFlakes = [
        "assets/img/snowflake1.svg",
        "assets/img/snowflake2.svg",
        "assets/img/snowflake3.svg"
    ];
    
    const randomIndex = Math.floor(Math.random(1) *snowFlakes.length);
    const randomSize = Math.random() * 20 + 10; 
    const randomX = Math.floor(Math.random() * snowFallContainer.offsetWidth) - randomSize;
    const fallDuration = Math.random() * 10 + 5;

    snowFall.src = snowFlakes[randomIndex];
    snowFall.style.position = "absolute";
    snowFall.style.left =`${randomX}px`;
    snowFall.style.top = `10px`;
    snowFall.style.height = `${randomSize}px`;
    snowFall.style.width = `${randomSize}px`
    snowFall.style.pointerEvents ="none";
    snowFall.style.transition = `transform ${fallDuration}s linear, opacity ${fallDuration}s ease-out`;

    snowFallContainer.appendChild(snowFall);

    console.log(randomIndex);
    console.log(randomX);
    
    setTimeout(() => {
        snowFall.style.transform = `translateY(${window.innerHeight - 10}px)`;
        snowFall.style.opacity = "0";
    }, 10);

   
    setTimeout(() => {
        createSnowFall();
        snowFall.remove();
    }, fallDuration * 1000);

}
// Startar passivt snöfall som spawnar antalet flingor som vi bestämt. 
for (let i = 0; i < SNOWFALLAMOUNT; i++) {
    
    setTimeout( ()=>{
        createSnowFall();
    }, i*520);
    
};
