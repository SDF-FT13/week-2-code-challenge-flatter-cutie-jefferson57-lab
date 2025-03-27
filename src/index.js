document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const nameElement = document.getElementById("name");
  const imageElement = document.getElementById("image");
  const voteCountElement = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const votesInput = document.getElementById("votes");
  const resetButton = document.getElementById("reset-btn");
  const characterForm = document.getElementById("character-form");
  const nameInput = document.getElementById("name");
  const imageUrlInput = document.getElementById("image-url");
  
  let currentCharacter = null;

  function fetchCharacters() {
      fetch("http://localhost:3000/characters")
          .then(response => response.json())
          .then(characters => {
              characters.forEach(character => {
                  const characterSpan = document.createElement("span");
                  characterSpan.textContent = character.name;
                  characterSpan.addEventListener("click", () => displayCharacterDetails(character));
                  characterBar.appendChild(characterSpan);
              });
          });
  }

  function displayCharacterDetails(character) {
      currentCharacter = character;
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCountElement.textContent = character.votes;
  }

  votesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (currentCharacter) {
          const enteredVotes = parseInt(votesInput.value);
          if (!isNaN(enteredVotes)) {
              currentCharacter.votes += enteredVotes;
              voteCountElement.textContent = currentCharacter.votes;
              votesInput.value = "";
              updateVotesOnServer(currentCharacter);
          } else {
              alert("Please enter a valid number!");
          }
      }
  });

  resetButton.addEventListener("click", () => {
      if (currentCharacter) {
          currentCharacter.votes = 0;
          voteCountElement.textContent = 0;
          updateVotesOnServer(currentCharacter);
      }
  });

  if (characterForm) {
      characterForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const newCharacter = {
              name: nameInput.value,
              image: imageUrlInput.value,
              votes: 0,
          };
          
          fetch("http://localhost:3000/characters", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(newCharacter),
          })
              .then(response => response.json())
              .then(addedCharacter => {
                  const characterSpan = document.createElement("span");
                  characterSpan.textContent = addedCharacter.name;
                  characterSpan.addEventListener("click", () => displayCharacterDetails(addedCharacter));
                  characterBar.appendChild(characterSpan);
                  displayCharacterDetails(addedCharacter);
                  nameInput.value = "";
                  imageUrlInput.value = "";
              });
      });
  }

  function updateVotesOnServer(character) {
      fetch(`http://localhost:3000/characters/${character.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ votes: character.votes }),
      })
      .catch(error => console.error("Error updating votes:", error));
  }

  fetchCharacters();
});
