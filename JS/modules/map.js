import { getFarmEmoji } from './utils.js';

let yandexMap = null;
const placemarks = {};   // id -> метка

// Создание кастомной метки для одной фермы
function createCustomPlacemark(farm, onClick) {
  const layout = ymaps.templateLayoutFactory.createClass(`
    <div style="
      background-color: ${farm.color};
      width: 50px;
      height: 50px;
      border-radius: 50% 50% 50% 10%;
      border: 1px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transform: rotate(-10deg);
      color: #333;
      cursor: pointer;
    ">${getFarmEmoji(farm.name)}</div>
  `);

  const placemark = new ymaps.Placemark(farm.coords, {
    hintContent: `<strong>${farm.name}</strong><br>${farm.description.substring(0, 80)}...`,
    balloonContent: `<strong>${farm.name}</strong><br>${farm.description.substring(0, 80)}...`
  }, {
    iconLayout: layout,
    iconShape: { type: 'Circle', coordinates: [20, 30], radius: 20 },
    hideIconOnBalloonOpen: false,
    zIndex: 100
  });

  placemark.options.set('farmId', farm.id);
  placemark.events.add('click', () => onClick(farm.id));

  return placemark;
}

// Инициализация карты
export function initMap(ymaps, center, zoom = 10) {
  yandexMap = new ymaps.Map('yandex-map', {
    center: center,
    zoom: zoom,
    controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
  });
  return yandexMap;
}

// Добавление всех меток на карту
export function addPlacemarks(farms, onPlacemarkClick) {
  farms.forEach(farm => {
    const placemark = createCustomPlacemark(farm, onPlacemarkClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}

// Перелёт к ферме по ID
export function flyToFarm(farmId, farms) {
  const farm = farms.find(f => f.id === farmId);
  if (!farm) return;

  yandexMap.setCenter(farm.coords, 12, {
    duration: 800,
    timingFunction: 'ease-in-out'
  });

  const placemark = placemarks[farmId];
  if (placemark) placemark.balloon.open();
}

// Подгонка карты под размер контейнера (после смены видимости)
export function fitMapToViewport() {
  if (yandexMap) yandexMap.container.fitToViewport();
}