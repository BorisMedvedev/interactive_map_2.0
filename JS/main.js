import { farms } from './modules/data.js';
import { initMap, addPlacemarks, flyToFarm, fitMapToViewport } from './modules/map.js';
import { initUI, renderFarmButtons, showDetailPage, showMainPage, bindEvents } from './modules/ui.js';

// Получаем ссылки на DOM-элементы
const domElements = {
  mainPage: document.getElementById('main-page'),
  detailPage: document.getElementById('detail-page'),
  farmButtonsContainer: document.getElementById('farm-buttons-container'),
  detailTitle: document.getElementById('detail-title'),
  detailDesc: document.getElementById('detail-desc'),
  detailImg: document.getElementById('detail-img'),
  detailCoordsSpan: document.getElementById('detail-coords'),
  productSpan: document.getElementById('detail-product'),
  backBtn: document.getElementById('back-to-main-btn')
};

// Инициализируем UI-модуль
initUI(domElements);

// Центр карты (можно взять из первой фермы или задать вручную)
const MAP_CENTER = [56.82254252681233, 40.85911659965104];

// Обработчик клика по кнопке фермы (с боковой панели)
function onFarmButtonClick(farmId) {
  // Если открыта детальная страница – сначала показываем карту
  if (domElements.detailPage.style.display !== 'none') {
    showMainPage(() => fitMapToViewport());
  }
  flyToFarm(farmId, farms);
}

// Обработчик клика по метке на карте
function onPlacemarkClick(farmId) {
  const farm = farms.find(f => f.id === farmId);
  if (farm) showDetailPage(farm);
}

// Главная функция инициализации приложения
function startApp() {
  // Ждём загрузки Яндекс.Карт
  ymaps.ready(() => {
    initMap(ymaps, MAP_CENTER, 10);
    addPlacemarks(farms, onPlacemarkClick);
    renderFarmButtons(farms, onFarmButtonClick);
    bindEvents(
      () => showMainPage(() => fitMapToViewport()),  // клик по кнопке "Назад"
      () => fitMapToViewport()                       // ресайз окна
    );
  });
}

// Запускаем приложение после полной загрузки DOM
document.addEventListener('DOMContentLoaded', startApp);