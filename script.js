function createNewCard() {

  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `<div class="card-down"></div>`;
  cardElement.innerHTML += `<div class="card-up"></div>`
  return cardElement;
}
createNewCardTest();


function appendNewCard(parentElement) {

  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}
appendNewCardTest();


function shuffleCardImageClasses() {

  let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];

  cardClasses = _.shuffle(cardClasses);
  return cardClasses;
}
shuffleCardImageClassesTest();


function createCards(parentElement, shuffledImageClasses) {

  let cardObjects = [];
  for (let i = 0; i < 12; i++) {

    let newCard = appendNewCard(parentElement);
    newCard.classList.add(shuffledImageClasses[i]);
    cardObjects.push({
      index: i, element: newCard, imageClass: shuffledImageClasses[i]
    });
  }
  return cardObjects;
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {

  if (cardObject1["imageClass"] === cardObject2["imageClass"]) {
    return true;
  }
}
doCardsMatchTest();

let counters = {};

function incrementCounter(counterName, parentElement) {

  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}
incrementCounterTest();

let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  
  /* Step 1: Use the 'incrementCounter' function to add one to the flip counter UI.  */
  incrementCounter("flips", document.getElementById("flip-count"));

  /* Step 2: If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do) */
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  /* If the above condition was not met, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard', respectively. */

  /* Step 3: If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped' to null, and use a 'return' to exit the function. Remember that newlyFlippedCard and lastCardFlipped are both objects made with the createCards function. This means that, to access each card's classList, you must access the card object's .element property first!  */

  if (lastCardFlipped.imageClass != newlyFlippedCard.imageClass) {

    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  /* Step 4: Now we have two matching cards. Increment the match counter and optionally add a "glow" effect to the matching cards. */
  // else if (doCardsMatch(newlyFlippedCard, lastCardFlipped) == true) {

  // }
  incrementCounter("matches", document.getElementById("match-count"));

  lastCardFlipped.element.classList.add("border-glow");
  newlyFlippedCard.element.classList.add("border-glow");


  /* Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win. Both sounds have been loaded in provided.js as matchAudio and winAudio, respectively. */

  if (counters["matches"] == 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

  /* Step 6: Reset 'lastCardFlipped' to null */
  lastCardFlipped = null;

}

/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {

  /* Step 1: Get the card container by its id and store it in a variable. */
  let parent = document.getElementById("card-container");



  /* Step 2: Clear all the cards by using a while loop to remove the first child of the card container as long as a first child exists.
  See "To remove all children from an element:" in the Examples section of the MDN removeChild documentation -> https://mzl.la/3bklFxP */
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  /* Step 3: Get the HTML elements that display the flip and match counts and reset their inner text to 0. */

  document.getElementById("flip-count").innerHTML = 0;
  document.getElementById("match-count").innerHTML = 0;


  /* Step 4: Reassign the value of the `counters` dictionary to an empty object  */
  counters = {};

  /* Step 5: Set lastCardFlipped back to null. */
  lastCardFlipped = null;

  /* Step 6: Set up a new game. */
  setUpGame();

}

setUpGame();