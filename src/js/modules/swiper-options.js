let mySwiper = undefined;
let mySwiper2 = undefined;
const breakpoint = 767.98;

function catalogSliderDestroy() {
	if (mySwiper) {
		mySwiper.destroy();
		mySwiper = undefined;
	}
	if (mySwiper2) {
		mySwiper2.destroy();
		mySwiper2 = undefined;
	}
		
}

function initSwiper() {
    var screenWidth = window.screen.width;
    if(screenWidth <= breakpoint && mySwiper == undefined) {   
		mySwiper = new Swiper('.merch-swiper', {
			loop: true,
			slidesPerView: 'auto',
			initialSlide: 1,
			navigation: {
			  nextEl: '.merch-swiper__button-next',
			  prevEl: '.merch-swiper__button-prev',
			},
		});   
		mySwiper2 = new Swiper('.release-swiper', {
			loop: true,
			slidesPerView: 'auto',
			navigation: {
			  nextEl: '.release-swiper__button-next',
			  prevEl: '.release-swiper__button-prev',
			},
		});   
		document.querySelector('.merch-swiper__navigation').style.display = 'block';
		document.querySelector('.release-swiper__navigation').style.display = 'block';
    } else if (screenWidth > breakpoint && mySwiper != undefined && mySwiper2 != undefined) {
        catalogSliderDestroy();
		document.querySelector('.merch-swiper__cards').removeAttribute('style');
		document.querySelector('.merch-swiper').removeAttribute('style');
		document.querySelector('.merch-swiper__navigation').style.display = 'none';

		document.querySelector('.release-swiper__items').removeAttribute('style');
		document.querySelector('.release-swiper').removeAttribute('style');
		document.querySelector('.release-swiper__navigation').style.display = 'none';
    }        
}

initSwiper();

window.addEventListener('resize', function() {
	initSwiper(); 
})
window.addEventListener('load', function() {
	initSwiper(); 
})
