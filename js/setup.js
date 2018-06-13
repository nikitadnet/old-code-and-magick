'use strict';

var namesArray = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnamesArray = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorArray = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArray = ['black', 'red', 'blue', 'yellow', 'green'];
var wizzards;
var userDialog = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomValue = function (values) {
  var rand = Math.floor(Math.random() * values.length);
  return rand;
};

var showElements = function (element) {
  element.classList.remove('hidden');
};

showElements(userDialog);
showElements(setupSimilar);

var getWizzardArray = function (names, surnames, coatColors, eyesColors) {
  var wizzardsList = [];
  var wizzard = {};
  var MAX_WIZZARDS = 4;
  for (var i = 1; i <= MAX_WIZZARDS; i++) {
    wizzard = {
      name: names[getRandomValue(names)] + ' ' + surnames[getRandomValue(surnames)],
      coatColor: coatColors[getRandomValue(coatColors)],
      eyesColor: eyesColors[getRandomValue(eyesColors)]
    };
    wizzardsList.push(wizzard);
  }
  return wizzardsList;
};

wizzards = getWizzardArray(namesArray, surnamesArray, coatColorArray, eyesColorArray);

var renderWizzard = function (wizzard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizzard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizzard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizzard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizzards.length; i++) {
  fragment.appendChild(renderWizzard(wizzards[i]));
}
similarListElement.appendChild(fragment);

