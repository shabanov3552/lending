//#region IBG
/* function ibg() {
	let ibg = document.querySelectorAll(".js_ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg(); */
//#endregion

//#region _loaded

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
			// document.querySelector('.preloader').classList.add('done');
		}, 200);
	}
});

let unlock = true;
//#endregion

//#region ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//#endregion

//#region Menu_burger
let iconMenu = document.querySelector(".icon-menu");
let menuMobileClose = document.querySelector('.menu-mobile__close');
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu-mobile");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock_add(delay);
			menuBody.classList.add("_active");
			document.querySelector('.wrapper').classList.add('menu-open');
		}
	});
	menuMobileClose.addEventListener("click", function (e) {
		menuBody.classList.remove("_active");
		document.documentElement.classList.remove('sub-menu-open')
		setTimeout(() => {
			document.querySelector('.wrapper').classList.remove('menu-open');
		}, 200);
		body_lock_remove(delay)
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu-mobile");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//#endregion

//#region BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	let rightMenu = document.querySelector(".menu-rt");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			rightMenu.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	let rightMenu = document.querySelector(".menu-rt");
	let pr = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = pr;
		rightMenu.style.paddingRight = pr;
		body.classList.add("_lock");
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//#endregion

//#region LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//#endregion

//#region Tabs
let tabs = document.querySelectorAll(".js_tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll(".js_tabs-item");
	let tabs_blocks = tab.querySelectorAll(".js_tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		if (tabs_item.closest('.menu-lt__sub-item') || tabs_item.closest('.menu-catalog__item')) {
			tabs_item.addEventListener("mouseenter", function (e) {
				for (let index = 0; index < tabs_items.length; index++) {
					let tabs_item = tabs_items[index];
					tabs_item.classList.remove('_active');
					tabs_blocks[index].classList.remove('_active');
				}
				tabs_item.classList.add('_active');
				tabs_blocks[index].classList.add('_active');
				e.preventDefault();
			});
		} else {
			tabs_item.addEventListener("click", function (e) {
				for (let index = 0; index < tabs_items.length; index++) {
					let tabs_item = tabs_items[index];
					tabs_item.classList.remove('_active');
					tabs_blocks[index].classList.remove('_active');
				}
				tabs_item.classList.add('_active');
				tabs_blocks[index].classList.add('_active');
				e.preventDefault();
			});
		}
	}
}
//#endregion

//#region SPOLLERS
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}

		// Получение слойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});

		// Инициализация слойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach(item => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addListener(function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_active')) {
						hideSpollersBody(spollersBlock);

					}
					spollerTitle.classList.toggle('_active');
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				document.addEventListener("click", documentActions);
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_active');
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
				document.removeEventListener("click", documentActions);
			}
		}
	}
} spollers()
//#endregion

//#region Gallery
let gallery = document.querySelectorAll('.js_gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//#endregion

//#region Popups
let popups = document.querySelectorAll('.popup');

document.addEventListener("click", function (e) {
	if (e.target.closest(".js_popup-link")) {
		let el = e.target.closest(".js_popup-link");
		if (el.closest('.menu-mobile')) {
			return
		}
		if (el.closest('[href="#callback"]')) {
			return
		}
		if (el.classList.contains('menu-lt__category') && el.nextElementSibling.closest('._active')) {
			popup_close()
		}
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	}
});
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function focus_input(item) {
	let form__input = document.querySelector('.popup_' + item + ' input');
	if (form__input) {

		setTimeout(() => {
			form__input.focus()
		}, 550);
	}
}
/* Проверка мобильного браузера */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
addTouchClass()
function popup_open(item, video = '') {
	focus_input(item)
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = `
			<video autoplay pip="false" muted="" controls preload="auto" class=" ">
				<source src="${video}" type="video/mp4">
			</video>`;
		}
		if (!document.querySelector('.menu-mobile._active')) {
			body_lock_add(500);
		}
		if (curent_popup.closest('.menu-lt__item')) {
			let header = document.querySelector(".header");
			let page = document.querySelector(".page");
			header.classList.add("open-menu-lt");
			if (page) page.classList.add("open-menu-lt");
			if (window.matchMedia("(min-width: 767.98px)").matches && !document.documentElement.closest('.touch')) {
				document.addEventListener("mouseover", documentActions);
				document.removeEventListener("click", documentActions);
			} else {
				document.addEventListener("click", documentActions);
				document.removeEventListener("mouseover", documentActions);
			}
			let popupImages = [...curent_popup.querySelectorAll('.menu-lt__img')];
			popupImages.forEach(image => {
				if (!image.src) {
					image.src = image.dataset.src
				}
			});
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	let header = document.querySelector(".header");
	let page = document.querySelector(".page");
	if (header) header.classList.remove("open-menu-lt");
	if (page) page.classList.remove("open-menu-lt");

	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');

			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
		document.documentElement.classList.remove('sub-menu-open')
		document.querySelector('._sub-menu-open')?.classList.remove('_sub-menu-open');
	}
}
document.addEventListener("click", function (e) {
	if (e.target.closest('.popup__close')) {
		popup_close(e.target.closest('.popup'));
	}
});
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});
//#endregion

//#region SlideToggle
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Создаем событие 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Создаем событие 
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//#endregion

//#region IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//#endregion

//#region RATING
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
	initRatings();
}
// Основная функция
function initRatings() {
	let ratingActive, ratingValue;
	// "Бегаем" по всем рейтингам на странице
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}

	// Инициализируем конкретный рейтинг
	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

		if (rating.classList.contains('rating_set')) {
			setRating(rating);
		}
	}

	// Инициализайция переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}
	// Изменяем ширину активных звезд
	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
	// Возможность указать оценку 
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener("mouseenter", function (e) {
				// Обновление переменных
				initRatingVars(rating);
				// Обновление активных звезд
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener("mouseleave", function (e) {
				// Обновление активных звезд
				setRatingActiveWidth();
			});
			ratingItem.addEventListener("click", function (e) {
				// Обновление переменных
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					// "Отправить" на сервер
					setRatingValue(ratingItem.value, rating);
				} else {
					// Отобразить указанную оцнку
					ratingValue.innerHTML = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}

	async function setRatingValue(value, rating) {
		if (!rating.classList.contains('rating_sending')) {
			rating.classList.add('rating_sending');

			// Отправика данных (value) на сервер
			let response = await fetch('rating.json', {
				method: 'GET',

				//body: JSON.stringify({
				//	userRating: value
				//}),
				//headers: {
				//	'content-type': 'application/json'
				//}

			});
			if (response.ok) {
				const result = await response.json();

				// Получаем новый рейтинг
				const newRating = result.newRating;

				// Вывод нового среднего результата
				ratingValue.innerHTML = newRating;

				// Обновление активных звезд
				setRatingActiveWidth();

				rating.classList.remove('rating_sending');
			} else {
				alert("Ошибка");

				rating.classList.remove('rating_sending');
			}
		}
	}
}
//#endregion


// function showMore() {
// 	window.addEventListener("load", function (e) {
// 		const showMoreBlocks = document.querySelectorAll('[data-showmore]');
// 		let showMoreBlocksRegular;
// 		let mdQueriesArray;
// 		if (showMoreBlocks.length) {
// 			// Получение обычных объектов
// 			showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
// 				return !item.dataset.showmoreMedia;
// 			});
// 			// Инициализация обычных объектов
// 			showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

// 			document.addEventListener("click", showMoreActions);
// 			window.addEventListener("resize", showMoreActions);

// 			// Получение объектов с медиа запросами
// 			mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
// 			if (mdQueriesArray && mdQueriesArray.length) {
// 				mdQueriesArray.forEach(mdQueriesItem => {
// 					// Событие
// 					mdQueriesItem.matchMedia.addEventListener("change", function () {
// 						initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
// 					});
// 				});
// 				initItemsMedia(mdQueriesArray);
// 			}
// 		}
// 		function initItemsMedia(mdQueriesArray) {
// 			mdQueriesArray.forEach(mdQueriesItem => {
// 				initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
// 			});
// 		}
// 		function initItems(showMoreBlocks, matchMedia) {
// 			showMoreBlocks.forEach(showMoreBlock => {
// 				initItem(showMoreBlock, matchMedia);
// 			});
// 		}
// 		function initItem(showMoreBlock, matchMedia = false) {
// 			showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
// 			let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
// 			let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
// 			showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
// 			showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
// 			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
// 			if (!showMoreContent.closest('._showmore-active')) {
// 				if (matchMedia.matches || !matchMedia) {
// 					if (hiddenHeight < getOriginalHeight(showMoreContent)) {
// 						_slideUp(showMoreContent, 0, hiddenHeight);
// 						showMoreButton.hidden = false;
// 					} else {
// 						_slideDown(showMoreContent, 0, hiddenHeight);
// 						showMoreButton.hidden = true;
// 					}
// 				} else {
// 					_slideDown(showMoreContent, 0, hiddenHeight);
// 					showMoreButton.hidden = true;
// 				}
// 			} else if (showMoreContent.closest('._showmore-active') && !(matchMedia.matches || !matchMedia)) {
// 				showMoreButton.hidden = true;
// 			} else if (showMoreContent.closest('._showmore-active') && (matchMedia.matches || !matchMedia)) {
// 				showMoreButton.hidden = false;
// 			}
// 		}
// 		function getHeight(showMoreBlock, showMoreContent) {
// 			let hiddenHeight = 0;
// 			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
// 			if (showMoreType === 'items') {
// 				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
// 				const showMoreItems = showMoreContent.children;
// 				if (showMoreContent.children.length <= showMoreTypeValue) {
// 					return
// 				}
// 				for (let index = 1; index < showMoreItems.length; index++) {
// 					const showMoreItem = showMoreItems[index - 1];
// 					hiddenHeight += showMoreItem.offsetHeight;
// 					if (index == showMoreTypeValue) break
// 				}
// 			} else if (showMoreType === 'parag') {
// 				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 2;
// 				const showMoreItems = showMoreContent.children;
// 				if (showMoreContent.children.length <= showMoreTypeValue) {
// 					return
// 				}
// 				for (let index = 1; index < showMoreItems.length; index++) {
// 					const showMoreItem = showMoreItems[index - 1];
// 					hiddenHeight += showMoreItem.offsetHeight;
// 					if (index == showMoreTypeValue) break
// 				}
// 			} else {
// 				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
// 				hiddenHeight = showMoreTypeValue;
// 			}
// 			return hiddenHeight;
// 		}
// 		function getOriginalHeight(showMoreContent) {
// 			let parentHidden;
// 			let hiddenHeight = showMoreContent.offsetHeight;
// 			showMoreContent.style.removeProperty('height');
// 			if (showMoreContent.closest(`[hidden]`)) {
// 				parentHidden = showMoreContent.closest(`[hidden]`);
// 				parentHidden.hidden = false;
// 			}
// 			let originalHeight = showMoreContent.offsetHeight;
// 			parentHidden ? parentHidden.hidden = true : null;
// 			showMoreContent.style.height = `${hiddenHeight}px`;
// 			return originalHeight;
// 		}
// 		function showMoreActions(e) {
// 			const targetEvent = e.target;
// 			const targetType = e.type;
// 			if (targetType === 'click') {
// 				if (targetEvent.closest('[data-showmore-button]')) {
// 					const showMoreButton = targetEvent.closest('[data-showmore-button]');
// 					const showMoreBlock = showMoreButton.closest('[data-showmore]');
// 					const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
// 					const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
// 					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
// 					if (!showMoreContent.classList.contains('_slide')) {
// 						showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
// 						showMoreBlock.classList.toggle('_showmore-active');
// 					}
// 				}
// 			} else if (targetType === 'resize') {
// 				showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
// 				mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
// 			}
// 		}
// 	});
// }
// showMore();

// function dataMediaQueries(array, dataSetValue) {
// 	// Получение объектов с медиа запросами
// 	const media = Array.from(array).filter(function (item, index, self) {
// 		if (item.dataset[dataSetValue]) {
// 			return item.dataset[dataSetValue].split(",")[0];
// 		}
// 	});
// 	// Инициализация объектов с медиа запросами
// 	if (media.length) {
// 		const breakpointsArray = [];
// 		media.forEach(item => {
// 			const params = item.dataset[dataSetValue];
// 			const breakpoint = {};
// 			const paramsArray = params.split(",");
// 			breakpoint.value = paramsArray[0];
// 			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
// 			breakpoint.item = item;
// 			breakpointsArray.push(breakpoint);
// 		});
// 		// Получаем уникальные брейкпоинты
// 		let mdQueries = breakpointsArray.map(function (item) {
// 			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
// 		});
// 		mdQueries = uniqArray(mdQueries);
// 		const mdQueriesArray = [];

// 		if (mdQueries.length) {
// 			// Работаем с каждым брейкпоинтом
// 			mdQueries.forEach(breakpoint => {
// 				const paramsArray = breakpoint.split(",");
// 				const mediaBreakpoint = paramsArray[1];
// 				const mediaType = paramsArray[2];
// 				const matchMedia = window.matchMedia(paramsArray[0]);
// 				// Объекты с нужными условиями
// 				const itemsArray = breakpointsArray.filter(function (item) {
// 					if (item.value === mediaBreakpoint && item.type === mediaType) {
// 						return true;
// 					}
// 				});
// 				mdQueriesArray.push({
// 					itemsArray,
// 					matchMedia
// 				})
// 			});
// 			return mdQueriesArray;
// 		}
// 	}
// }