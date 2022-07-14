import * as flsFunctions from "./modules/functions.js";
import "./modules/swiper-bundle.min.js";
import "./modules/swiper-options.js";

flsFunctions.isWebp();
flsFunctions.ibg();
flsFunctions.toggleClassActive();

const anchors = [].slice.call(document.querySelectorAll('.header .header__menu .menu__body .menu__list a[href*="index.html#"]'));
const anchorConcert = document.querySelector('.main-screen a[href*="index.html#concerts"');
anchors.push(anchorConcert)
const index = 'index.html'

flsFunctions.scrollToElement(anchors, index);

// flsFunctions.addVideo();
flsFunctions.closeMenu();

// flsFunctions.filterReleases();

const audio = document.querySelector('.audio-block__audio');
const title = document.querySelector('.audio-block__track-name');
const audioItems = document.querySelectorAll('.album__audio-item');
const playBtns = document.querySelectorAll('.svg-play-dims');

const dataSrc = document.querySelectorAll('[data-src]');
let trackSrcs = [];
let trackNames = [];

dataSrc.forEach(function(item) {
	trackSrcs.push(item.dataset.src)
})

dataSrc.forEach(item => {
	trackNames.push(item.innerHTML)
})

function playSong(trackIndex) {
	playBtns[0].innerHTML = '';
	playBtns[0].classList.remove('svg-play-dims');
	playBtns[0].classList.add('svg-pause-dims');
	playBtns[0].insertAdjacentHTML('afterbegin', '<use xlink:href="../img/icons/icons.svg#pause"></use>')
	playBtns[trackIndex].innerHTML = '';
	playBtns[trackIndex].classList.remove('svg-play-dims');
	playBtns[trackIndex].classList.add('svg-pause-dims');
	playBtns[trackIndex].insertAdjacentHTML('afterbegin', '<use xlink:href="../img/icons/icons.svg#pause"></use>')
	audio.play();
}

function pauseSong(trackIndex) {
	playBtns[0].innerHTML = '';
	playBtns[0].classList.remove('svg-pause-dims');
	playBtns[0].classList.add('svg-play-dims');
	playBtns[0].insertAdjacentHTML('afterbegin', '<use xlink:href="../img/icons/icons.svg#play"></use>')

	playBtns[trackIndex].innerHTML = '';
	playBtns[trackIndex].classList.remove('svg-pause-dims');
	playBtns[trackIndex].classList.add('svg-play-dims');
	playBtns[trackIndex].insertAdjacentHTML('afterbegin', '<use xlink:href="../img/icons/icons.svg#play"></use>')
	audio.pause();
}

function loadSong(song, songName) {
	title.innerHTML = songName;
	audio.src = `${song}`;
}

let loadedSong = false;
let trackIndex = 1;

playBtns.forEach(function (playBtn) {
	playBtn.closest('.icons__item').addEventListener("click", function (e) {
		if (e.target.closest('.audio-block__icons')) {
			console.log(trackIndex);
			audioItems[trackIndex - 1].classList.toggle('active');
			if (loadedSong == false) {
				loadSong(trackSrcs[0], trackNames[0]);
				playBtn.classList.contains('svg-play-dims') ? playSong(trackIndex) : pauseSong(trackIndex);
				loadedSong = true;
			} else {
				playBtn.classList.contains('svg-play-dims') ? playSong(trackIndex) : pauseSong(trackIndex);
			}
		} else {
			trackIndex = Array.from(playBtns).indexOf(playBtn);
			
			
			
		}
	})
})
















			// audioItems.forEach(item => {
			// 	if (item.classList.contains('active')) {
			// 		const itemIndex = Array.from(audioItems).indexOf(item);
			// 		console.log(trackIndex);
			// 		if ((trackIndex - 1) == itemIndex) {
			// 			pauseSong(itemIndex);
			// 		} 
			// 		trackIndex = Array.from(playBtns).indexOf(playBtn);
			// 		loadSong(trackSrcs[trackIndex - 1], trackNames[trackIndex - 1]);
			// 	}
			// })

			// trackIndex = Array.from(playBtns).indexOf(playBtn);
			// if (loadedSong == false) {
			// 	loadSong(trackSrcs[trackIndex - 1], trackNames[trackIndex - 1]);
			// 	loadedSong = true;
			// }
			// audioItems[trackIndex - 1].classList.toggle('active');
			// playBtn.classList.contains('svg-play-dims') ? playSong(trackIndex) : pauseSong(trackIndex);
