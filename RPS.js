const createElements = () => {
    const instruction = document.createElement('h3');
    instruction.innerText = "Take your pick";
    instruction.className = 'h3-class';

    const image1 = document.getElementById('rock');
    image1.src = '../thumbnails/rock.jpg';
    image1.className = 'images';
    const image2 = document.getElementById('paper');
    image2.src = '../thumbnails/paper.png';
    image2.className = 'images';
    const image3 = document.getElementById('scissor');
    image3.src = '../thumbnails/scissor.png';
    image3.className = 'images';

    appendElements(instruction, image1, image2, image3);   
}

const appendElements = (item1, item2, item3, item4) => {
    document.getElementById('game-content').appendChild(item1);
    document.getElementById('flex-container-id').appendChild(item4, item3, item2);
}

const computerChoice = () => {
const imageArray = ['rock', 'paper', 'scissor'];
return imageArray[Math.floor(Math.random() * 3)];
}

const clearFlex = () => {document.getElementById('flex-container-id').innerHTML = '';}

const appendToFlex = (item1, item2, item3) => {
document.getElementById('flex-container-id').appendChild(item1);
document.getElementById('flex-container-id').appendChild(item2);
document.getElementById('flex-container-id').appendChild(item3);
}

const newH1 = () => {
const h1 = document.createElement('h1');
return h1;
}

const newH3 = () => {
    document.getElementById('game-content').innerHTML = '';
    const newText = document.createElement('h3');
    newText.innerText = 'Game results';
    document.getElementById('game-content').appendChild(newText);
}

const resetBtn = () => {
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset game';
    resetButton.className = 'reset-Btn';
    resetButton.onclick = resetGame;
    return resetButton;
}

const quitBtn = () => {
    const quitButton = document.createElement('button');
    quitButton.innerText = 'Quit game';
    quitButton.className = 'quit-Btn';
    quitButton.onclick = quitGame;
    return quitButton;
}

const decider = event => {
    const chosenPic = event.target;
const options = {
    "rock": {"rock": "It's a tie", "paper": "You lose!", "scissor": "You win!"},
    "paper": {"rock": "You win!", "paper": "It's a tie", "scissor": "You lose!"},
    "scissor": {"rock": "You lose!", "paper": "You win!", "scissor": "It's a tie"}
}

const userChoice = chosenPic.id;
const compChoice = computerChoice();

const thumbnails = {'rock': '../thumbnails/rock.jpg', 'paper': '../thumbnails/paper.png', 'scissor': '../thumbnails/scissor.png'};

const udiv = document.createElement('div');
udiv.innerHTML = "<img class=added src='"+thumbnails[userChoice]+"' height: 250px; width: 250px;>";

const userText = document.createElement('p');
userText.innerText = 'You chose ' + userChoice;
udiv.appendChild(userText);

const cdiv = document.createElement('div');
cdiv.innerHTML = "<img class=added src='"+thumbnails[compChoice]+"' height: 250px; width: 250px;>";

const compText = document.createElement('p');
compText.innerText = 'Computer chose ' + compChoice;
cdiv.appendChild(compText);

const fm = document.createElement('div');
fm.className = 'fm';
const finalMessage = newH1();
finalMessage.className = 'fmessage'
finalMessage.innerText = options[userChoice][compChoice];
if (finalMessage.innerText === "It's a tie") {finalMessage.style = 'color: yellow;'}
else if (finalMessage.innerText === "You lose!") {finalMessage.style = 'color: red;'}
else if (finalMessage.innerText === "You win!") {finalMessage.style = 'color: green;'}
fm.appendChild(finalMessage);
fm.appendChild(resetBtn());
fm.appendChild(quitBtn());

resetBtn();
newH3();
clearFlex();
appendToFlex(udiv, fm, cdiv);
}

const appendImages = () => {
    const image1 = document.createElement('img');
    image1.id = 'rock';
    image1.onclick = decider;
    const image2 = document.createElement('img');
    image2.id = 'paper';
    image2.onclick = decider;
    const image3 = document.createElement('img');
    image3.id = 'scissor';
    image3.onclick = decider;
    appendToFlex(image1, image2, image3);
}

const resetGame = () => {
    document.getElementById('game-content').innerHTML = '';
    clearFlex();
    appendImages();
    createElements();
}

const quitGame = () => {
    document.getElementById('game-content').innerHTML = '';
    clearFlex();
    appendImages();
}