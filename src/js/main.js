window.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        cards = require('./modules/cards'),
        form = require('./modules/form'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc');
  
  tabs();
  modal();
  timer();
  cards();
  form();
  slider();
  calc();
});
