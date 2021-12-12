import mapNavigationClickToTemplate from '../navigation';
import createQuizHousesPage from './quizHousesPage';

const createGameModePage = (rootElement) => {
  const appScreen = document.querySelector(rootElement);
  const gameModePage = document.querySelector('#gameModePage');

  appScreen.innerHTML = gameModePage.innerHTML;

  //mapNavigationClickToTemplate(rootElement, '[data-action-houses]', createQuizHousesPage);


// change placeholder 
const form = document.querySelector("form");
  form.addEventListener("focus", function( event ) {
    event.target.style.background = "rgba(211, 166, 37, 1)";
  }, true);
  form.addEventListener("blur", function( event ) {
    event.target.style.background = "";
  }, true);
 

// get the value from placeholder
form.addEventListener('input', e => {
  let player = e.target.value;
    console.log(player);
  });


// kategorie oddzielnie
const students = document.getElementById('students');
const staff = document.getElementById('staff');
const houses = document.getElementById('houses');

  
//add border color 
const tipBtn = document.querySelectorAll('.gameMode__btn');
tipBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      tipBtn.forEach(btn => {
        btn.classList.remove('bor');
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('bor');
        }
    });
    });
});
};

export default createGameModePage;