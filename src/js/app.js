import * as flsFunctions from "./modules/functions.js";
import "./modules/swiper-bundle.min.js";
import "./modules/swiper-options.js";
import "./modules/audioplayer.js";

flsFunctions.isWebp();
flsFunctions.ibg();
flsFunctions.toggleClassActive();

const anchors = [].slice.call(document.querySelectorAll('.header .header__menu .menu__body .menu__list a[href*="index.html#"]'));
const anchorConcert = document.querySelector('.main-screen a[href*="index.html#concerts"');
anchors.push(anchorConcert)
const index = 'index.html'

flsFunctions.scrollToElement(anchors, index);

flsFunctions.addVideo();
flsFunctions.closeMenu();

const page = 'releases.html';
flsFunctions.filterReleases(page);