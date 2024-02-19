import tabs from './modules/tabs';
import modal, {openModal} from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
  
  tabs('.tabheader__item', '.tabcontent',
       '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2024-06-01');
  cards();
  form('form', modalTimerId);
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    sliderWrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  calc();
});
