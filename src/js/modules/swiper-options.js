const releaseSwiper = new Swiper('.release-swiper', {
	loop: true,
	slidesPerView: 'auto',
	navigation: {
		nextEl: '.release-swiper__button-next',
		prevEl: '.release-swiper__button-prev',
	},
	autoplay: {
		delay: 5000,
	},
	centeredSlides: true,
	breakpoints: { 
		768: {
			centeredSlides: false
		}
	}
})

const merchSwiper = new Swiper('.merch-swiper', {
	loop: true,
	slidesPerView: 'auto',
	initialSlide: 1,
	autoplay: {
		delay: 5000,
	},
	navigation: {
		nextEl: '.merch-swiper__button-next',
		prevEl: '.merch-swiper__button-prev',
	},
})
