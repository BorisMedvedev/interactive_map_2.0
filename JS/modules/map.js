// map.js — всё, что связано с Яндекс.Картой
// ИСПРАВЛЕНО: иконки теперь работают через ImageLayout с data-URL SVG

import { getFarmEmoji } from './utils.js';

let yandexMap = null;
let ymapsRef = null;
const placemarks = {};

// ─── Создать кастомную метку ──────────────────────────────────────────────────
function createCustomPlacemark(farm, onClick) {
  // Получаем SVG строку
  const svgContent = getFarmEmoji(farm.product);

  // Собираем полный SVG с фоновым кружком
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="44" viewBox="0 0 40 44">
    <!-- Тень -->
    <ellipse cx="20" cy="42" rx="8" ry="3" fill="rgba(0,0,0,0.2)"/>
    <!-- Пин-форма -->
    <path d="M20 2 C10.06 2 2 10.06 2 20 C2 32 20 42 20 42 C20 42 38 32 38 20 C38 10.06 29.94 2 20 2Z" fill="${farm.color}" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
    <!-- Иконка внутри (центрированная) -->
    <g transform="translate(11, 11)">${svgContent.replace(/width="[^"]*"/g, 'width="18"').replace(/height="[^"]*"/g, 'height="18"')}</g>
  </svg>`;

  // Кодируем SVG в data URL
  const encoded = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(fullSvg);

  const placemark = new ymapsRef.Placemark(
    farm.coords,
    {
      hintContent: `<strong>${farm.name}</strong><br>${farm.product}`,
      balloonContent: `
        <div style="max-width:220px;font-family:system-ui,sans-serif">
          <strong style="display:block;margin-bottom:4px;color:#2c3e2f">${farm.name}</strong>
          <span style="font-size:12px;color:#4a6741">${farm.product}</span>
          <p style="margin:6px 0;font-size:13px;color:#555">${farm.description.substring(0, 100)}...</p>
          <button onclick="window._openFarm && window._openFarm('${farm.id}')"
            style="background:#3b8c4a;color:#fff;border:none;border-radius:4px;padding:4px 10px;cursor:pointer;font-size:12px;margin-top:4px">
            Подробнее
          </button>
        </div>
      `,
    },
    {
      iconLayout: 'default#image',
      iconImageHref: encoded,
      iconImageSize: [40, 44],
      iconImageOffset: [-20, -44],
      hideIconOnBalloonOpen: false,
      zIndex: 100,
    },
  );

  placemark.events.add('click', () => onClick(farm.id));
  return placemark;
}

// ─── Инициализация карты ──────────────────────────────────────────────────────
export function initMap(ymaps, center, zoom = 10) {
  ymapsRef = ymaps;
  yandexMap = new ymaps.Map('yandex-map', {
    center,
    zoom,
    controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
  });
  return yandexMap;
}

// ─── Добавить метки ───────────────────────────────────────────────────────────
export function addPlacemarks(farms, onPlacemarkClick) {
  farms.forEach((farm) => {
    const placemark = createCustomPlacemark(farm, onPlacemarkClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}

// ─── Перелет к ферме ──────────────────────────────────────────────────────────
export function flyToFarm(farmId, farms) {
  const farm = farms.find((f) => f.id === farmId);
  if (!farm) return;
  yandexMap.setCenter(farm.coords, 14, { duration: 800, timingFunction: 'ease-in-out' });
  const placemark = placemarks[farmId];
  if (placemark) placemark.balloon.open();
}

// ─── Подогнать карту под контейнер ───────────────────────────────────────────
export function fitMapToViewport() {
  if (yandexMap) yandexMap.container.fitToViewport();
}

// ─── Обновить метки (фильтрация) ──────────────────────────────────────────────
export function updatePlacemarks(filteredFarms, onClick) {
  yandexMap.geoObjects.removeAll();
  for (let id in placemarks) delete placemarks[id];
  filteredFarms.forEach((farm) => {
    const placemark = createCustomPlacemark(farm, onClick);
    yandexMap.geoObjects.add(placemark);
    placemarks[farm.id] = placemark;
  });
}
