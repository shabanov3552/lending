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

//#region viewPass
let viewPass = document.querySelectorAll('._viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}
//#endregion

//#region Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				input_focus_add(input);
				if (input.getAttribute('data-type') === "pass") {
					if (input.parentElement.querySelector('._viewpass')) {
						if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
							input.setAttribute('type', 'password');
						}
					} else {
						input.setAttribute('type', 'password');
					}
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('js_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+7(x99) 999 9999", {
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						definitions: {
							x: {
								validator: '[0-69-9]'
							}
						},
						onincomplete: function () {
							input_clear_mask(input);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				/* form_remove_error(input); */
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
document.addEventListener('click', function (e) {
	if (e.target.closest('.form__input-clear')) {
		let cleaned = e.target.closest('.form__line').querySelector('input');
		cleaned.value = '';
		input_focus_remove(cleaned)
	}
});
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.insertAdjacentHTML('afterend', '<span class="form__input-clear"><img src="img/svg/icon_clear.svg" alt=""></span>');
		input.insertAdjacentHTML('afterend', '<span class="form__input-placeholder">' + input_g_value + '</span>');
	}
	if (input.value == '' && input_g_value == '') {
		input.insertAdjacentHTML('afterend', '<span class="form__input-clear"><img src="img/svg/icon_clear.svg" alt=""></span>');
		input.insertAdjacentHTML('afterend', '<span class="form__input-placeholder"></span>');
	}
	if (input.value.length > 0) {
		input.insertAdjacentHTML('afterend', '<span class="form__input-clear"><img src="img/svg/icon_clear.svg" alt=""></span>');
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input_focus_remove(input);
}
//#endregion

//#region QUANTITY
// let quantityButtons = document.querySelectorAll('.quantity__button');
// if (quantityButtons.length > 0) {
// 	for (let index = 0; index < quantityButtons.length; index++) {
// 		const quantityButton = quantityButtons[index];
// 		quantityButton.addEventListener("click", function (e) {
// 			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
// 			if (quantityButton.classList.contains('quantity__button_plus')) {
// 				value++;
// 			} else {
// 				value = value - 1;
// 				if (value < 1) {
// 					value = 1
// 				}
// 			}
// 			quantityButton.closest('.quantity').querySelector('input').value = value;
// 		});
// 	}
// }
//#endregion

//#region RANGE
const priceSlider = document.querySelector('.price-filter__slider');
if (priceSlider) {

	let textFrom = priceSlider.getAttribute('data-from');
	let textTo = priceSlider.getAttribute('data-to');

	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	/*
	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);
	*/

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}
//#endregion
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle




function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "js_dynamic_adapt";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "max") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

if (document.querySelector('.main-slider__slider')) {
	new Swiper('.main-slider__slider', {
		slidesPerView: 'auto',
		loop: true,
		slideToClickedSlide: true,
		speed: 500,
		parallax: true,
		watchSlidesProgress: true,
		preloadImages: false,
		lazy: {
			checkInView: true,
			enabled: true,
			loadPrevNext: true,
			loadPrevNextAmount: 3,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: ".main-slider__nav-btn.swiper-button-next",
			prevEl: ".main-slider__nav-btn.swiper-button-prev",
		},

		initialSlide: 8,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			500: {
				slidesPerView: 3,
			},
			769: {
				slidesPerView: 1,
			},
			1101: {
				slidesPerView: 2.5,
			},
			1540: {
				slidesPerView: 'auto',
			},
		},
		thumbs: {
			swiper: {
				el: '.main-slider__bg-slider',
				loop: true,
				effect: "fade",
				watchSlidesProgress: true,
				preloadImages: false,
				lazy: {
					enabled: true,
					loadPrevNext: true,
					loadOnTransitionStart: true,
				},
			},
		},
	});
}

if (document.querySelector('.popular__slider')) {
	new Swiper('.popular__slider', {
		/* autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		}, */
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			600: {
				slidesPerView: 2,
			},
			980: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 4,
			},
			1740: {
				slidesPerView: 5,
			},
		},
		speed: 200,
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		loop: true,
		navigation: {
			nextEl: ".popular__nav-next_1",
			prevEl: ".popular__nav-prev_1",
		},
	});
}

if (document.querySelector('.popular__slider2')) {
	new Swiper('.popular__slider2', {
		/* autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		}, */
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			600: {
				slidesPerView: 2,
			},
			980: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 4,
			},
			1740: {
				slidesPerView: 5,
			},
		},
		speed: 200,
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		loop: true,
		navigation: {
			nextEl: ".popular__nav-next_2",
			prevEl: ".popular__nav-prev_2",
		},
	});
}

if (document.querySelector('.popular__slider3')) {
	new Swiper('.popular__slider3', {
		/* autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		}, */
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			600: {
				slidesPerView: 2,
			},
			980: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 4,
			},
			1740: {
				slidesPerView: 5,
			},
		},
		speed: 200,
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		loop: true,
		navigation: {
			nextEl: ".popular__nav-next_3",
			prevEl: ".popular__nav-prev_3",
		},
	});
}

if (document.querySelector('.works__slider')) {
	let worksSliderThumbs = new Swiper('.works__desc-slider', {
		allowTouchMove: false,
		autoHeight: true,
	});
	let worksSlider = new Swiper('.works__slider', {
		initialSlide: 1,
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 130,
			modifier: 1,
			slideShadows: true,
		},
		navigation: {
			nextEl: ".works__slider-nav .swiper-button-next",
			prevEl: ".works__slider-nav .swiper-button-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,

			},
			545: {
				slidesPerView: "auto",
			},
			1920: {
				slidesPerView: 3,
			}
		},
		pagination: {
			type: 'fraction',
			el: '.swiper-pagination.works__slider-counter'
		},
		on: {
			// init: function () {
			// 	let currentSlide = this.activeIndex + 1;
			// 	document.querySelector('.works__slider-counter').innerHTML = `
			// 	<span class="counter__current">
			// 		${currentSlide}
			// 	</span> 
			// 	/ 
			// 	<span class="counter__total">
			// 		${this.slides.length}
			// 	</span>`;
			// },
			slideChange: function () {
				let currentSlide = this.activeIndex + 1;
				// document.querySelector('.works__slider-counter').innerHTML = `
				// <span class="counter__current">
				// 	${currentSlide}
				// </span> 
				// / 
				// <span class="counter__total">
				// 	${this.slides.length}
				// </span>`;
				if (this.activeIndex % 3 === 0) {
					worksSliderThumbs.slideTo(this.activeIndex / 3);

				} else {
					worksSliderThumbs.slideTo(this.activeIndex / 3);

				}
			},
		},
	});
}

if (document.querySelector('.photo-slider__slider')) {
	new Swiper('.photo-slider__slider', {
		navigation: {
			nextEl: ".photo-slider .swiper-button-next",
			prevEl: ".photo-slider .swiper-button-prev",
		},
		pagination: {
			type: 'fraction',
			el: '.photo-slider .swiper-pagination'
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 'auto',
			}
		}
		// thumbs: {
		// 	swiper: {
		// 		el: '.slider-product__nav',
		// 		slidesPerView: 6,
		// 		spaceBetween: 9,
		// 		breakpoints: {
		// 			320: {
		// 				direction: "vertical",
		// 				slidesPerView: 4,
		// 			},
		// 			1440: {
		// 				direction: "vertical",
		// 				slidesPerView: 6,
		// 			},
		// 		},
		// 	},
		// },
		// spaceBetween: 5,
	});
}

if (document.querySelector('.case__photo-slider')) {
	new Swiper('.case__photo-slider', {
		slidesPerView: 2,
		navigation: {
			nextEl: ".case__photo-slider-nav-next",
			prevEl: ".case__photo-slider-nav-prev",
		},
		spaceBetween: 18,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			700: {
				slidesPerView: 2,
			},
		},
	});
}
if (document.querySelector('#map')) {
	mapAdd();


	function mapAdd() {
		let tag = document.createElement('script');
		tag.src = "https://api-maps.yandex.ru/2.1/?apikey=0aa2f6b6-353d-4a10-bb62-97763a975ef4&lang=ru_RU";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}


	setTimeout(function () {


		ymaps.ready(init);



		function init() {
			var myMap = new ymaps.Map("map", {
				center: [56.06424707707, 92.98117485581962],
				zoom: 17,
				controls: ['zoomControl'],
			});
			let addresFirst = new ymaps.Placemark([56.06424707707, 92.98117485581962], {}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/local/templates/main/img/svg/icon_mark_green.svg',
				iconImageSize: [43, 54],
				iconImageOffset: [-20, -20],
				iconContentOffset: [0, 0],
			});
			myMap.geoObjects.add(addresFirst);
			myMap.behaviors.disable('scrollZoom');
		}
	}, 1000);

}
//#region Переключатель отображения в каталоге
let sort__layout_btns = document.querySelectorAll(".sort__layout-btn");


for (let index = 0; index < sort__layout_btns.length; index++) {
	let layout = document.querySelector(".js__layout");
	if (layout === null) {
		continue;
	}
	let row = document.querySelector('.layout-row');
	let col = document.querySelector('.layout-col ');
	let sort__layout_btn = sort__layout_btns[index];
	if (localStorage.getItem('layout') == 'row') {
		layout.classList.add('layout__row');
		layout.classList.remove('layout__col');
		row.classList.add('_active');
		col.classList.remove('_active');
	} else {
		layout.classList.add('layout__col');
		layout.classList.remove('layout__row');
		col.classList.add('_active');
		row.classList.remove('_active');
	}
	sort__layout_btn.addEventListener("click", function (e) {
		if (col.classList.contains('_active')) {
			layout.classList.add('layout__row');
			layout.classList.remove('layout__col');
			localStorage.setItem('layout', 'row')
		}
		if (row.classList.contains('_active')) {
			layout.classList.remove('layout__row');
			layout.classList.add('layout__col');
			localStorage.setItem('layout', 'col')
		}
		for (let index = 0; index < sort__layout_btns.length; index++) {
			let sort__layout_btn = sort__layout_btns[index];
			sort__layout_btn.classList.remove('_active');
		}
		sort__layout_btn.classList.add('_active');
	});
};

//#endregion

//#region автовысота для textarea

function txtarAutoHeight(target) {
	const el = target;
	if (el.closest('textarea')) {
		el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
		el.classList.add('auto');
		el.addEventListener('input', e => {
			el.style.height = 'auto';
			el.style.height = (el.scrollHeight) + 10 + 'px';
		});
	}
}

//#endregion

//#region Кнопка вверх и лого


window.addEventListener('scroll', buttonToTop);
function buttonToTop(e) {
	let scr_val = window.pageYOffset;
	const btnTop = document.querySelector('.top-button');
	scr_val > 1500 ? btnTop.classList.add('_active') : btnTop.classList.remove('_active');
	btnTop.addEventListener("click", function (e) {
		e.preventDefault()
		window.scrollTo(0, 0);
	});
};

//#endregion

//#region nice-select init

$(document).ready(function () {
	$('select').niceSelect();
});

//#endregion

//#region Плавающая линия для табов


document.querySelectorAll(".float-line").forEach(e => {
	floatLine(e)
});

function floatLine(node) {
	if (!node) return

	node.addEventListener("mouseover", (e) => {
		if (e.target.classList.contains("float-line__item")) {
			node.style.setProperty(
				"--underline-width",
				`${e.target.offsetWidth}px`
			);
			node.style.setProperty(
				"--underline-offset-x",
				`${e.target.offsetLeft}px`
			);
		}
	});
	node.addEventListener("mouseleave", () =>
		node.style.setProperty("--underline-width", "0")
	);
}

//#endregion

//#region show change-data input

function changeData(target) {
	let el = target.closest('.personal-data__row')
	el.classList.add('_active');
	let submitBtn = el.querySelector('.personal-data__btn')
	submitBtn.addEventListener("click", function (e) {
		el.classList.remove('_active');
		el.classList.add('show-msg');
		setTimeout(() => {
			el.classList.remove('show-msg');
		}, 3000);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'NumpadEnter') {
			el.classList.remove('_active');
			el.classList.add('show-msg');
			setTimeout(() => {
				el.classList.remove('show-msg')
			}, 3000);
		}
	});
}
//#endregion

//#region global click

document.addEventListener("click", function (e) {
	if (e.target.closest('.personal-data__change')) {
		changeData(e.target)
		e.preventDefault()
	}
	if (e.target.closest('textarea')) {
		txtarAutoHeight(e.target)
	}
	/* if (e.target.closest('.js_video-control')) {
		aboutPlayVideo()
	} */
	if (e.target.closest('[href="#callback"]')) {
		popup_open('callback')
	}
});

//#endregion

//#region tippy подсказки

tippy(document.querySelectorAll('.tippy'), {
	placement: 'top',
	maxWidth: 260,
});

//#endregion

//#region about-video-play

/* function aboutPlayVideo() {
	let videoContainer = document.querySelector('.js_video-block');
	let video = document.querySelector('.js_video');
	if (video.getAttribute('src') === '') {
		console.log('Не прописан путь к видеоролику в атрибуте src тега video');
		return false;
	}
	if (video.paused) {
		video.play();
		videoContainer.classList.add('video-is-playing');
	} else {
		video.pause();
		videoContainer.classList.remove('video-is-playing');
		//	возвращаем постер
		video.load();
	}
	video.addEventListener('ended', function (e) {
		videoContainer.classList.remove('video-is-playing');
		video.load();

	});
} */

//#endregion

//#region show-more contacts

const btn_more = document.querySelectorAll('.contacts__show-more');

btn_more.forEach(element => {
	element.addEventListener("click", function (e) {
		e.preventDefault();
		e.target.classList.toggle('_active');
		e.target.previousElementSibling.classList.toggle('_active');
		if (!e.target.classList.contains('_active')) {
			element.innerHTML = 'Раскрыть все реквизиты';
		} else {
			element.innerHTML = 'Скрыть';
		}
	});
});

//#endregion

//#region parslye init

$('.form').parsley();

//#endregion

//#region смена текста кнопки

// if (document.querySelectorAll('.order__more-btn').length > 0) {
// 	let more_btn = document.querySelectorAll('.order__more-btn');
// 	for (let btn = 0; btn < more_btn.length; btn++) {
// 		const element = more_btn[btn];
// 		console.log(element);
// 	}
// };

document.addEventListener("click", function (e) {
	let target = e.target
	if (target.closest('.order__more-btn')) {
		target.classList.contains('_active') ? target.innerHTML = 'Свернуть состав заказа' : target.innerHTML = 'Показать состав заказа';
		e.preventDefault()

	}
});
//#endregion

//#region функционал двойного скролла

(function ($) {

	jQuery.fn.doubleScroll = function (userOptions) {

		// Default options
		var options = {
			contentElement: undefined, // Widest element, if not specified first child element will be used
			scrollCss: {
				'overflow-x': 'auto',
				'overflow-y': 'hidden',
				'height': '13px',
				'cursor': 'pointer',
			},
			contentCss: {
				'overflow-x': 'auto',
				'overflow-y': 'hidden'
			},
			onlyIfScroll: true, // top scrollbar is not shown if the bottom one is not present
			resetOnWindowResize: true, // recompute the top ScrollBar requirements when the window is resized
			timeToWaitForResize: 30 // wait for the last update event (usefull when browser fire resize event constantly during ressing)
		};

		$.extend(true, options, userOptions);

		// do not modify
		// internal stuff
		$.extend(options, {
			topScrollBarMarkup: '<div class="doubleScroll-scroll-wrapper"><div class="doubleScroll-scroll"></div></div>',
			topScrollBarWrapperSelector: '.doubleScroll-scroll-wrapper',
			topScrollBarInnerSelector: '.doubleScroll-scroll'
		});

		var _showScrollBar = function ($self, options) {

			if (options.onlyIfScroll && $self.get(0).scrollWidth <= Math.round($self.width())) {
				// content doesn't scroll
				// remove any existing occurrence...
				$self.prev(options.topScrollBarWrapperSelector).remove();
				return;
			}

			// add div that will act as an upper scroll only if not already added to the DOM
			var $topScrollBar = $self.prev(options.topScrollBarWrapperSelector);

			if ($topScrollBar.length == 0) {

				// creating the scrollbar
				// added before in the DOM
				$topScrollBar = $(options.topScrollBarMarkup);
				$self.before($topScrollBar);

				// apply the css
				$topScrollBar.css(options.scrollCss);
				$(options.topScrollBarInnerSelector).css("height", "20px");
				$self.css(options.contentCss);

				var scrolling = false;

				// bind upper scroll to bottom scroll
				$topScrollBar.bind('scroll.doubleScroll', function () {
					if (scrolling) {
						scrolling = false;
						return;
					}
					scrolling = true;
					$self.scrollLeft($topScrollBar.scrollLeft());
				});

				// bind bottom scroll to upper scroll
				var selfScrollHandler = function () {
					if (scrolling) {
						scrolling = false;
						return;
					}
					scrolling = true;
					$topScrollBar.scrollLeft($self.scrollLeft());
				};
				$self.bind('scroll.doubleScroll', selfScrollHandler);
			}

			// find the content element (should be the widest one)	
			var $contentElement;

			if (options.contentElement !== undefined && $self.find(options.contentElement).length !== 0) {
				$contentElement = $self.find(options.contentElement);
			} else {
				$contentElement = $self.find('>:first-child');
			}

			// set the width of the wrappers
			$(options.topScrollBarInnerSelector, $topScrollBar).width($contentElement.outerWidth());
			$topScrollBar.width($self.width());
			$topScrollBar.scrollLeft($self.scrollLeft());

		}

		return this.each(function () {

			var $self = $(this);

			_showScrollBar($self, options);

			// bind the resize handler 
			// do it once
			if (options.resetOnWindowResize) {

				var id;
				var handler = function (e) {
					_showScrollBar($self, options);
				};

				$(window).bind('resize.doubleScroll', function () {
					// adding/removing/replacing the scrollbar might resize the window
					// so the resizing flag will avoid the infinite loop here...
					clearTimeout(id);
					id = setTimeout(handler, options.timeToWaitForResize);
				});

			}

		});

	}

}(jQuery));

$(document).ready(function () {
	$('.double-scroll').doubleScroll();
});

//#endregion

//#region showmore desc

function showmoreDesc() {
	const desc = document.querySelector('[data-desc-more]');
	if (!desc) {
		return
	}

	const moreContent = document.querySelector('[data-more-content]');
	const openButton = desc.querySelector('[data-more-open]');
	const closeButton = desc.querySelector('[data-more-close]');

	desc.addEventListener('click', moreActions);

	function moreActions(e) {
		const el = e.target
		if (el.hasAttribute('data-more-open') || el.closest('[data-more-open]')) {
			_slideUp(openButton)
			_slideDown(moreContent)
			_slideDown(closeButton)
		}
		if (el.hasAttribute('data-more-close') || el.closest('[data-more-close]')) {
			_slideUp(moreContent)
			_slideUp(closeButton)
			_slideDown(openButton)
		}
	}
}
showmoreDesc()

//#endregion

// !!убрать перед передачей на бэк
document.querySelectorAll('.compare__btn-param').forEach((n, i, a) => {
	n.addEventListener('click', () => a.forEach(m => {
		m.classList.toggle('_active', m === n)
	}));
});


// //Избранное в шапке
// function favoriteCount() {
// 	let div = document.getElementById('favoriteButton');

// 	var favorites = JSON.parse(localStorage.getItem('favoriteItems'));
// 	if (favorites !== '') {
// 		var favoritesQuantity = favorites.length;

// 		if (favoritesQuantity === 0) {
// 			$('#favorite_count').hide();
// 		} else {
// 			div.classList.add('active');
// 			$('#favorite_count').show();
// 			$('#favorite_count').text(favoritesQuantity);
// 		}
// 	}

// 	let items = document.querySelectorAll('.js_favorite');

// 	if (items.length == 0)

// 		return;

// 	items.forEach(function (item) {
// 		if (item.classList.contains('remove')) {
// 			let tooltip = item.querySelector('.card__button-item-span');;

// 			if (tooltip != null)
// 				tooltip.textContent = 'Удалить';
// 		}

// 	});
// }


// //Сравнение в шапке
// function compareCount() {
// 	let div = document.getElementById('compareButton');
// 	//$('#favorite_count').hide();
// 	var compare = JSON.parse(localStorage.getItem('compareItems'));
// 	if (compare !== '') {
// 		var compareQuantity = compare.length;

// 		if (compareQuantity === 0) {
// 			$('#compare_count').hide();
// 		} else {

// 			div.classList.add('active');
// 			$('#compare_count').show();
// 			$('#compare_count').text(compareQuantity);
// 		}
// 	}

// 	let items = document.querySelectorAll('.js_compare');

// 	if (items.length == 0)
// 		return;

// 	items.forEach(function (itemcompare) {
// 		if (itemcompare.classList.contains('remove')) {
// 			let tooltip = itemcompare.querySelector('.card__button-item-span');
// 			if (tooltip != null)
// 				tooltip.textContent = 'Удалить';
// 		}

// 	});

// }
// $(document).ready(function () {
// 	favoriteCount();
// });
// $(document).ready(function () {
// 	compareCount();
// });


// высота строк в сравнении 
window.addEventListener("load", function () {
	const dataName = Array.from(document.querySelectorAll('[data-name]'));
	let names = [];
	dataName.forEach(el => {
		if (!names.includes(el.dataset.name)) {
			names.push(el.dataset.name)
		}
	});
	for (const name of names) {
		setHeight(name)
	}
	function setHeight(name) {
		const nodeName = document.querySelector(`[data-main=${name}]`);
		const node = document.querySelectorAll(`[data-name=${name}]`);
		let heights = []
		heights.push(nodeName.scrollHeight);
		node.forEach(el => {
			heights.push(el.scrollHeight);
		});
		let maxHei = Math.max(...heights);
		node.forEach(element => {
			element.style.height = maxHei + 'px';
		});
		nodeName ? nodeName.style.height = maxHei + 'px' : null;
	}
	let btnChek = document.querySelector(".radio-inline input[type=\"radio\"]:checked");
	if (btnChek) {
		btnChek.closest('.radio-inline').classList.add('checked');
	}
});


// скролл на странице сравнения
$(document).ready(function () {
	function checkWidth() {
		var windowWidth = $('body').innerWidth();
		scrollNice('.compare-card__row');
		touchHorizScroll('.compare-card__row');
		// if (windowWidth > 700) {
		// } else {
		// 	scrollNice('.compare-card__conatiner');
		// 	touchHorizScroll('.compare-card__conatiner');
		// }
	}
	checkWidth();

	$(window).resize(function () {
		checkWidth();
	});
	function scrollNice(event) {
		$(event).niceScroll({
			cursorcolor: "#d8d8d8",
			cursorwidth: "13px",
			cursorborder: false,
			cursorborderradius: false,
			autohidemode: false,
			railvalign: 'top',
			horizrailenabled: true,
			hwacceleration: true,
			ouchbehavior: true,
			// touchbehavior: true,
		});
	}

	function touchHorizScroll(id) {

		if (isTouchDevice()) { //if touch events exist...
			var el = document.querySelector(id);
			if (!el) {
				return;
			}
			var scrollStartPos = 0;

			el.addEventListener("touchstart", function (event) {
				scrollStartPos = this.scrollLeft + event.touches[0].pageX;
			}, false);

			el.addEventListener("touchmove", function (event) {
				this.scrollLeft = scrollStartPos - event.touches[0].pageX;
			}, false);
		}
	}
	function isTouchDevice() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}
});

// добавление класса к радио кнопке в оформлении.

if (document.querySelector('#bx-soa-region')) {
	var mutationObserver = new MutationObserver(function () {
		const radioChek = document.querySelector('input[type=\"radio\"]:checked');
		radioChek.closest('.radio-inline').classList.add('checked');
	});

	mutationObserver.observe(document.querySelector('#bx-soa-region'), {
		attributes: true,
		childList: true,
	});

}

if (document.querySelector("#bx-soa-orderSave")) {
	document.querySelector("#bx-soa-orderSave input").setAttribute('class', "checkbox__input");
	document.querySelector("#bx-soa-orderSave span").setAttribute('class', "checkbox__text");
	document.querySelector("#bx-soa-orderSave span").innerHTML = "\<span>Я даю свое согласие на <a class=\"js_popup-link\" href=\"#consent\">обработку персональных данных</a></span>";

}

// кастомный select 
function CustomSelect(options) {
	var elem = options.elem;
	let vivod = document.createElement('div');
	vivod.classList.add('product-item__title');
	vivod.innerHTML = "Выберите";
	let node = elem.querySelector(".product-item-scu-container");
	node.prepend(vivod);

	elem.onclick = function (event) {
		if (event.target.className == 'product-item__title') {
			toggle();
		} else if (event.target.closest('.product-item-scu-item-text-container')) {
			setValue(event.target.innerHTML, event.target.dataset.value);
			close();
		}
	}

	var isOpen = false;

	// ------ обработчики ------

	// закрыть селект, если клик вне его
	function onDocumentClick(event) {
		if (!elem.contains(event.target)) close();
	}

	// ------------------------

	function setValue(title, value) {
		elem.querySelector('.product-item__title').innerHTML = title;

		var widgetEvent = new CustomEvent('select', {
			bubbles: true,
			detail: {
				title: title,
				value: value
			}
		});

		elem.dispatchEvent(widgetEvent);

	}

	function toggle() {
		if (isOpen) close()
		else open();
	}

	function open() {
		elem.classList.add('open');
		document.addEventListener('click', onDocumentClick);
		isOpen = true;
		setTimeout(function () {
			// body
			_slideDown(elem.querySelector('.product-item-scu-item-list'), 200);
		}, 10);
	}

	function close() {
		elem.classList.remove('open');
		document.removeEventListener('click', onDocumentClick);
		isOpen = false;
		setTimeout(function () {
			// body
			_slideUp(elem.querySelector('.product-item-scu-item-list'), 200);
		}, 10);
	}
};

const customSelets = Array.from(document.querySelectorAll('#custom-select'));
if (customSelets) {
	customSelets.forEach(el => {
		el = new CustomSelect({
			elem: el
		});
	});
}


function maskInput(target) {
	if (target) {
		target.classList.add('_mask');
		Inputmask("+7(999) 999 9999", {
			clearIncomplete: true,
			clearMaskOnLostFocus: true,
			onincomplete: function () {
				input_clear_mask(target);
			}
		}).mask(target);
	}
}
document.addEventListener('focusin', (e) => {
	if (e.target.closest('[autocomplete=\"tel\"]')) {
		let target = e.target.closest('[autocomplete=\"tel\"]')
		maskInput(target)
	}
	if (e.target.closest('[name="properties[PHONE]"]')) {
		let target = e.target.closest('[name="properties[PHONE]"]')
		maskInput(target)
	}
})
document.addEventListener("click", function (e) {
	if (e.target.closest('[autocomplete=\"tel\"]')) {
		let target = e.target.closest('[autocomplete=\"tel\"]')
		maskInput(target)
	}
	if (e.target.closest('[name="properties[PHONE]"]')) {
		let target = e.target.closest('[name="properties[PHONE]"]')
		maskInput(target)
	}
	if (e.target.closest(".bx-soa-customer-input")) {
		inputs_init(e.target.closest(".bx-soa-customer-input"))
	}
	if (e.target.closest('.links-block__item')) {
		linksHumansActions(e.target.closest('.links-block__item'))
	}
	if (!e.target.closest('.links-block__item')) {
		const activeLink = document.querySelector('.links-block__item_open');
		if (activeLink && activeLink !== e.target.closest('.links-block__item')) activeLink.classList.remove('links-block__item_open');
	}
});

function linksHumansActions(e) {
	const activeLink = document.querySelector('.links-block__item_open');
	if (activeLink && activeLink !== e) activeLink.classList.remove('links-block__item_open');
	e.classList.toggle('links-block__item_open');
}

function documentActions(e) {
	if (e.target.closest('[data-parent]')) {
		const targetElement = e.target.closest('[data-parent]');
		const subMenuId = targetElement.closest('[data-parent]').dataset.parent ? targetElement.closest('[data-parent]').dataset.parent : null;
		const subMenu = targetElement.closest('.menu-catalog').querySelector(`[data-submenu="${subMenuId}"]`);

		if (subMenu) {
			const activeLink = document.querySelector('._sub-menu-active');
			const activeBlock = document.querySelector('._sub-menu-open');


			if (activeLink && activeLink !== targetElement) {
				activeLink.classList.remove('_sub-menu-active');
				activeBlock.classList.remove('_sub-menu-open');
				document.documentElement.classList.remove('sub-menu-open');
			}
			document.documentElement.classList.add('sub-menu-open');
			targetElement.classList.add('_sub-menu-active');
			subMenu.classList.add('_sub-menu-open');

			e.preventDefault();
		}
	} else {
		if (e.target.closest('.sub-menu-catalog')) {
			if (e.target.closest('.sub-menu-catalog__back')) {
				document.documentElement.classList.remove('sub-menu-open');
				document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
				document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
				e.preventDefault();
			}
			return
		}
		const activeLink = document.querySelector('._sub-menu-active');
		const activeBlock = document.querySelector('._sub-menu-open');


		if (activeLink) {
			activeLink.classList.remove('_sub-menu-active');
			activeBlock?.classList.remove('_sub-menu-open');
			document.documentElement.classList.remove('sub-menu-open');
		}
	}
}

