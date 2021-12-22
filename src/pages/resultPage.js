/* eslint-disable spaced-comment */
import mapNavigationClickToTemplate from '../navigation';
import { paths } from '../shared/router';
import { getCurrentPlayerData } from '../localStorageManager';

const createResultPage = () => {
  const appScreen = document.querySelector('#root');
  const resultPage = document.querySelector('#resultPage');

  appScreen.innerHTML = resultPage.innerHTML;

  mapNavigationClickToTemplate('[data-action-start]', paths.gameMode);
  mapNavigationClickToTemplate('[data-action-scores]', paths.ranking);
  mapNavigationClickToTemplate('[data-action-home]', paths.home);
};

export default createResultPage;

//------------------------------------------------

function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('allPlayers'));
}

function filterPlayers(category) {
  // console.log(category);
  const categorizedPlayers = [];
  const players = getDataFromLocalStorage();
  // console.log(players);
  if (players) {
    players.forEach((player) => {
      const singleArrayElement = player;
      if (singleArrayElement) {
        if (singleArrayElement.category === category) {
          categorizedPlayers.push(singleArrayElement);
          // console.log('dodało gracza');
        }
      }
    });
  }
  return categorizedPlayers;
}
function sortPlayers(category) {
  const filter = filterPlayers(category);
  // console.log(filter);
  return filter.sort((a, b) => b.score - a.score);
}

function savePlayerToLocaleStorage(player) {
  const allPlayers = [];
  if (getDataFromLocalStorage()) {
    getDataFromLocalStorage().forEach((values) => allPlayers.push(values));
  }
  allPlayers.push(JSON.parse(player));
  localStorage.setItem('allPlayers', JSON.stringify(allPlayers));
}

// należy dodawać curretPlayerData w momencie gdy skończy się czas
// lub klikniety będzie koniec prowadzący do resultPage

savePlayerToLocaleStorage(getCurrentPlayerData());
// console.log(filterPlayers('houses'));
// console.log(filterPlayers('students'));
// console.log(sortPlayers('students'));

function importBestPlayersToHtml() {
  const currentPlayer = JSON.parse(getCurrentPlayerData());
  let bestPlayers = [];
  if (currentPlayer) {
    if (currentPlayer.category === 'houses') {
      bestPlayers = sortPlayers(currentPlayer.category);
      console.log('gracz gra w houses');
    } else if (currentPlayer.category === 'staff') {
      bestPlayers = sortPlayers(currentPlayer.category);
      console.log('gracz gra w staff');
    } else if (currentPlayer.category === 'students') {
      bestPlayers = sortPlayers(currentPlayer.category);
      console.log('gracz gra w students');
    }
    console.log(bestPlayers[0]);

    //dostanie się do templatu resultPage
    const template = document.querySelector('#resultPage');
    //dostanie się do ol w resultPage
    const listBestScore = template.content.querySelector('.resultPage__bestScores--list');

    const firstBestPlayer = document.createElement('li');
    firstBestPlayer.innerHTML = `${bestPlayers[0].name} &emsp; ${bestPlayers[0].score}PTS`;

    const secondBestPlayer = document.createElement('li');
    secondBestPlayer.innerHTML = `${bestPlayers[1].name} &emsp; ${bestPlayers[1].score} PTS`;

    const thirdBestPlayer = document.createElement('li');
    thirdBestPlayer.innerHTML = `${bestPlayers[2].name}&emsp; ${bestPlayers[2].score} PTS`;

    listBestScore.appendChild(firstBestPlayer);
    listBestScore.appendChild(secondBestPlayer);
    listBestScore.appendChild(thirdBestPlayer);
  }
}

function congratulations() {
  const currentPlayer = JSON.parse(getCurrentPlayerData());

  //dostanie się do templatu resultPage
  const template = document.querySelector('#resultPage');

  const scoreInformations = template.content.querySelector('.resultPage__congrats');

  const textCongrats = document.createElement('p');
  textCongrats.className = 'resultPage__congrats--center';
  textCongrats.innerHTML = `Congratulation ${currentPlayer.name} ! <br />
  You answered X questions correctly in .... sec!`;

  scoreInformations.appendChild(textCongrats);
}

function score() {
  const currentPlayer = JSON.parse(getCurrentPlayerData());
  //dostanie się do templatu resultPage
  const template = document.querySelector('#resultPage');

  const scoreElement = template.content.querySelector('.resultPage__yourScore');
  console.log(scoreElement);
  const textYourScore = document.createElement('p');
  textYourScore.innerHTML = `Your Score: ${currentPlayer.score} pts`;

  scoreElement.appendChild(textYourScore);
}

importBestPlayersToHtml();
congratulations();
score();
