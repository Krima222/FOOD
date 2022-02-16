import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import slide from './modules/slide';
import forms from './modules/forms';
import cards from './modules/cards';
import {openModal} from './modules/modal';


window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-06-12');
    calc();
    slide({
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    });
    forms('form', modalTimerId);
    cards();
 });
