// map.js — всё, что связано с Яндекс.Картой

import { getFarmEmoji } from './utils.js';

/**
 * ИЗМЕНЕНИЯ:
 * 1. initMap теперь использует параметр zoom (раньше он был жёстко задан как 12,
 *    хотя функция принимала zoom как аргумент — это был баг).
 *
 * 2. createCustomPlacemark теперь получает farm.product (а не farm.name)
 *    в getFarmEmoji — потому что utils.js теперь ищет эмодзи по продукту.
 *
 * 3. Шаблон метки не изменился — эмодзи корректно отображается в div.
 */

let yandexMap = null;
const placemarks = {}; // id фермы → объект Placemark

// Создаёт кастомную метку для одной фермы
function createCustomPlacemark(farm, onClick) {
  const emoji = getFarmEmoji(farm.product); // исправлено: передаём product, не name

  const layout = ymaps.templateLayoutFactory.createClass(`
    <div style="
      background-color: ${farm.color};
      width: 34px;
      height: 34px;
      border-radius: 50% 50% 50% 10%;
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      transition: transform 0.2s;
    ">${emoji}</div>
  `);

  const placemark = new ymaps.Placemark(
    farm.coords,
    {
      hintContent: `<strong>${farm.name}</strong><br>${farm.description.substring(0, 80)}...`,
      balloonContent: `<strong>${farm.name}</strong><br>${farm.description.substring(0, 80)}...`,
    },
    {
      iconLayout: layout,
      iconShape: { type: 'Circle', coordinates: [17, 17], radius: 20 },
      hideIconOnBalloonOpen: false,
      zIndex: 100,
    },
  );

  placemark.events.add('click', () => onClick(farm.id));

  return placemark;
}

/**
 * Инициализирует карту.
 * @param {object} ymapsObj — глобальный объект ymaps
 * @param {Array}  center   — [lat, lng] центр карты
 * @param {number} zoom     — масштаб (ИСПРАВЛЕНО: теперь используется)
 */
export function initMap(ymapsObj, center, zoom = 10) {
  yandexMap = new ymapsObj.Map('yandex-map', {
    center: center,
    zoom: zoom, // БАГ ИСПРАВЛЕН: раньше всегда было zoom: 12
    controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
  });
  return yandexMap;
}

/**
 * Добавляет метки всех ферм на карту.
 */
export function addPlacemarks(farms, onPlacemarkClick) {
  farms.forEach((farm) => {
    const placemark = createCustomPlacemark(farm, onPlacemarkClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}

/**
 * Перелетает к ферме и открывает её балун.
 */
export function flyToFarm(farmId, farms) {
  const farm = farms.find((f) => f.id === farmId);
  if (!farm) return;

  yandexMap.setCenter(farm.coords, 14, {
    duration: 800,
    timingFunction: 'ease-in-out',
  });

  const placemark = placemarks[farmId];
  if (placemark) placemark.balloon.open();
}

/**
 * Подгоняет карту под размер контейнера.
 * Нужно вызывать после того, как карта снова становится видимой.
 */
export function fitMapToViewport() {
  if (yandexMap) yandexMap.container.fitToViewport();
}

/**
 * Обновляет метки на карте: убирает старые, добавляет только отфильтрованные.
 * @param {Array} filteredFarms — фермы после фильтра + поиска
 * @param {Function} onClick    — обработчик клика по метке
 */
export function updatePlacemarks(filteredFarms, onClick) {
  // Удаляем все метки с карты
  yandexMap.geoObjects.removeAll();
  // Очищаем кэш
  for (let id in placemarks) delete placemarks[id];

  // Добавляем только нужные
  filteredFarms.forEach((farm) => {
    const placemark = createCustomPlacemark(farm, onClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}
