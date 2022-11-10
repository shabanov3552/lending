
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