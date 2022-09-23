const page = document.URL.includes("music-album-");

if (page) {
	const audio = document.querySelector(".audio-block__audio");
	const title = document.querySelector(".audio-block__track-name");
	const audioItems = document.querySelectorAll(".music-album__audio-item");
	const basicMaxTrackDuration = document.querySelector(".audio-progress__max-time");

	const playBtns = document.querySelectorAll(".svg-play-dims");
	const nextBtn = document.querySelector(".svg-skip-next-dims");
	const prevBtn = document.querySelector(".svg-skip-previous-dims");
	const progressArea = document.querySelector(
		".audio-progress__line-container"
	);
	const progressBar = document.querySelector(".progress-bar__red-line");

	const dataSrc = document.querySelectorAll("[data-src]");
	let trackNames = [];
	let prevIndex = 0;
	let trackIndex = 1;
	let trackSrcs = [];

	dataSrc.forEach(function (item) {
		trackSrcs.push(item.dataset.src);
	});
	
	dataSrc.forEach((item) => {
		trackNames.push(item.innerHTML);
	});

	window.addEventListener("load", () => {
		loadSong(trackSrcs[0], trackNames[0]);
	});

	function changeIcon(trackIndex, addClass, removeClass) {
		playBtns[trackIndex].innerHTML = "";
		playBtns[trackIndex].classList.remove(`svg-${removeClass}-dims`);
		playBtns[trackIndex].classList.add(`svg-${addClass}-dims`);
		playBtns[trackIndex].insertAdjacentHTML(
			"afterbegin",
			`<use xlink:href="./img/icons/icons.svg#${addClass}"></use>`
		);
	}

	function playSong(trackIndex) {
		changeIcon(0, "pause", "play");
		changeIcon(trackIndex, "pause", "play");

		audio.play();
	}

	function pauseSong(trackIndex) {
		changeIcon(0, "play", "pause");
		changeIcon(trackIndex, "play", "pause");

		audio.pause();
	}

	function loadSong(trackSrc, trackName) {
		title.innerHTML = trackName;

		audio.src = `${trackSrc}`;
	}

	function nextSong(trackIndex) {
		if (trackIndex == 0) {
			pauseSong(trackIndex + 1);
			trackIndex = trackIndex + 2;
		} else {
			if (!playBtns[trackIndex].classList.contains("svg-play-dims")) {
				pauseSong(trackIndex);
			}
			trackIndex++;
		}
		audioItems.length < trackIndex ? (trackIndex = 1) : (trackIndex = trackIndex);
		loadSong(trackSrcs[trackIndex - 1], trackNames[trackIndex - 1]);
		playSong(trackIndex);
		return trackIndex;
	}

	function prevSong(trackIndex) {
		if (trackIndex == 0) {
			pauseSong(trackIndex + 1);
			trackIndex--;
			trackIndex < 0
				? (trackIndex = audioItems.length)
				: (trackIndex = trackIndex);
		} else {
			if (!playBtns[trackIndex].classList.contains("svg-play-dims")) {
				pauseSong(trackIndex);
			}
			trackIndex--;
			trackIndex < 1
				? (trackIndex = audioItems.length)
				: (trackIndex = trackIndex);
		}
		loadSong(trackSrcs[trackIndex - 1], trackNames[trackIndex - 1]);
		playSong(trackIndex);

		return trackIndex;
	}

	playBtns.forEach(function (playBtn) {
		playBtn.closest(".icons__item").addEventListener("click", function (e) {
			trackIndex = Array.from(playBtns).indexOf(playBtn);
			if (e.target.closest(".audio-block__icons")) {
				if (prevIndex == 0) {
					prevIndex = 1;
					playBtn.classList.contains("svg-play-dims")
						? playSong(trackIndex + 1)
						: pauseSong(trackIndex + 1);
				} else {
					playBtn.classList.contains("svg-play-dims")
						? playSong(prevIndex)
						: pauseSong(prevIndex);
				}
			} else {
				const activeAudioSrc =
					playBtn.closest(".audio-item").childNodes[2].nextSibling.dataset.src;
				if (audio.getAttribute("src") !== activeAudioSrc) {
					playBtns.forEach(function (playBtn) {
						if (!playBtn.classList.contains("svg-play-dims")) {
							pauseSong(Array.from(playBtns).indexOf(playBtn));
						}
					});
					pauseSong(prevIndex);
					loadSong(trackSrcs[trackIndex - 1], trackNames[trackIndex - 1]);
				}
				playBtn.classList.contains("svg-play-dims")
					? playSong(trackIndex)
					: pauseSong(trackIndex);
				prevIndex = trackIndex;
			}
		});
	});

	nextBtn.closest(".icons__item").addEventListener("click", () => {
		trackIndex = nextSong(trackIndex);
	});

	prevBtn.closest(".icons__item").addEventListener("click", () => {
		trackIndex = prevSong(trackIndex);
	});

	progressArea.addEventListener("click", (e) => {
		const progressWidth = progressArea.clientWidth;
		const clickedOffsetX = e.offsetX;
		const songDuration = audio.duration;

		audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
		playSong(trackIndex);
	});

	audio.addEventListener("ended", () => {
		trackIndex = nextSong(trackIndex);
	});

	audio.addEventListener("timeupdate", (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		let progressWidth = (currentTime / duration) * 100;
		progressBar.style.width = `${progressWidth}%`;

		let musicCurrentTime = document.querySelector(
			".audio-progress__current-time"
		);
		audio.addEventListener("loadeddata", () => {
			let mainAdDuration = audio.duration;
			let totalMin;
			Math.floor(mainAdDuration / 60) > 10
				? (totalMin = Math.floor(mainAdDuration / 60))
				: (totalMin = "0" + Math.floor(mainAdDuration / 60));
			let totalSec = Math.floor(mainAdDuration % 60);
			if (totalSec < 10) {
				totalSec = `0${totalSec}`;
			}
			basicMaxTrackDuration.innerText = `${totalMin}:${totalSec}`;
		});

		let currentMin;
		Math.floor(currentTime / 60) > 10
			? (currentMin = Math.floor(currentTime / 60))
			: (currentMin = "0" + Math.floor(currentTime / 60));
		let currentSec = Math.floor(currentTime % 60);
		if (currentSec < 10) {
			currentSec = `0${currentSec}`;
		}
		musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
	});
}