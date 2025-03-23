// Your code here
document.addEventListener("DOMContentLoaded", () =>){
    const characterBar = document.getElementById("character-Bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetForm = document.getElementById("reset-btn");

    function fetchCHaracters(){
        fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const spanCharacter = document.createElement("span");
                spanCharacter.textContent = character.name;
                spanCharacter.addEventListener("click", () => showCharacterInfo (character));
                characterBar.appendChild(spanCharacter);
                
            });
        });
    }
} 