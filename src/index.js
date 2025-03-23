// Your code here
document.addEventListener("DOMContentLoaded", () =>){
    const characterBar = document.getElementById("character-Bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetForm = document.getElementById("reset-btn");
    
    let currentCharacter = null;

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

function showCharacterInfo(character){
    currentCharacter = character
    detailedInfo.querySelector("#name").textContent = character.name;  
    detailedInfo.querySelector("#img").src = character.image;
    detailedInfo.querySelector("#vote-count").textContent = character.votes;  
}

votesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentCharacter) {
        const enteredVotes = parseInt(votesInput.value);
        if (!isNaN(enteredVotes)){
            currentCharacter.votes += enteredVotes;
            detailedInfo.querySelector("#vote-count").textContent = currentCharacter.votes;
            votesInput.value = '';

        }
        else{
            alert("USE VALID INPUT!")

        }
    }
});

resetBtn.addEventListener("click", ()=> {
    if (currentCharacter){
        currentCharacter.votes = 0;
        detailedInfo.querySelector("#vote-count").textContent = 0;
        
    }
});

