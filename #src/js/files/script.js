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

