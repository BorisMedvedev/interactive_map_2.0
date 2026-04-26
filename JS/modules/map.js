// map.js — всё, что связано с Яндекс.Картой

import { getFarmEmoji } from './utils.js';

let yandexMap = null;
const placemarks = {};

function createCustomPlacemark(farm, onClick) {
  const iconHtml = getFarmEmoji(farm.product);

  const layout = ymaps.templateLayoutFactory.createClass(`
    <div style="
      background-color: ${farm.color};
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 10%;
      border: 2px solid rgba(255,255,255,0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      color: #ffffff;
    ">${iconHtml}</div>
  `);

  const placemark = new ymaps.Placemark(
    farm.coords,
    {
      hintContent: `<strong>${farm.name}</strong><br>${farm.description.substring(0, 80)}...`,
      balloonContent: `<strong>${farm.name}</strong><br>${farm.description.substring(0, 80)}...`,
    },
    {
      iconLayout: layout,
      iconShape: { type: 'Circle', coordinates: [18, 18], radius: 20 },
      hideIconOnBalloonOpen: false,
      zIndex: 100,
    },
  );

  placemark.events.add('click', () => onClick(farm.id));
  return placemark;
}

export function initMap(ymapsObj, center, zoom = 10) {
  yandexMap = new ymapsObj.Map('yandex-map', {
    center: center,
    zoom: zoom,
    controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
  });
  return yandexMap;
}

export function addPlacemarks(farms, onPlacemarkClick) {
  farms.forEach((farm) => {
    const placemark = createCustomPlacemark(farm, onPlacemarkClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}

export function flyToFarm(farmId, farms) {
  const farm = farms.find((f) => f.id === farmId);
  if (!farm) return;
  yandexMap.setCenter(farm.coords, 14, { duration: 800, timingFunction: 'ease-in-out' });
  const placemark = placemarks[farmId];
  if (placemark) placemark.balloon.open();
}

export function fitMapToViewport() {
  if (yandexMap) yandexMap.container.fitToViewport();
}

export function updatePlacemarks(filteredFarms, onClick) {
  yandexMap.geoObjects.removeAll();
  for (let id in placemarks) delete placemarks[id];
  filteredFarms.forEach((farm) => {
    const placemark = createCustomPlacemark(farm, onClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}
