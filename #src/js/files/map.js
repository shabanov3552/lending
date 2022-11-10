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