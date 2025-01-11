function createFloatingText(text, x, y) {
    const floatingText = document.createElement("div");
    floatingText.innerText = `+${text}`;
    floatingText.style.position = "absolute";
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingText.style.fontSize = "16px";
    floatingText.style.fontWeight = "bold";
    floatingText.style.color = "white";
    floatingText.style.textShadow = "0 0 5px black";
    floatingText.style.pointerEvents = "none";
    floatingText.style.opacity = "1";
    floatingText.style.transition = "transform 1s ease-out, opacity 1s ease-out";

    document.body.appendChild(floatingText);

    // Vänta en liten stund och animera
    setTimeout(() => {
        floatingText.style.transform = "translateY(-50px)";
        floatingText.style.opacity = "0";
    }, 10);

    // Ta bort texten efter animationen
    setTimeout(() => {
        floatingText.remove();
    }, 1000);
}


export default floatingText;