// main.js — точка входа приложения

import { farms } from './modules/data.js';
import { initMap, addPlacemarks, flyToFarm, fitMapToViewport, updatePlacemarks } from './modules/map.js';
import { initUI, renderFilteredButtons, showDetailPage, showMainPage, bindEvents, initFilterButtons } from './modules/ui.js';
import { filterFarms } from './modules/filter.js';
import { getPageContent } from './modules/pages.js';
import { setSearchQuery, applySearch } from './modules/search.js';

const domElements = {
  mainPage:             document.getElementById('main-page'),
  detailPage:           document.getElementById('detail-page'),
  farmButtonsContainer: document.getElementById('farm-buttons-container'),
  detailTitle:          document.getElementById('detail-title'),
  detailDesc:           document.getElementById('detail-desc'),
  detailImg:            document.getElementById('detail-img'),
  detailCoordsSpan:     document.getElementById('detail-coords'),
  productSpan:          document.getElementById('detail-product'),
  backBtn:              document.getElementById('back-to-main-btn'),
  productTel:           document.getElementById('detail-tel'),
  productEmail:         document.getElementById('detail-email'),
  additionalInfo:       document.getElementById('detail-additionalInfo'),
};

initUI(domElements);

const MAP_CENTER = [56.82254252681233, 40.85911659965104];

function fullUpdate() {
  let filtered = filterFarms(farms);
  filtered = applySearch(filtered);
  renderFilteredButtons(farms, onFarmButtonClick);
  updatePlacemarks(filtered, onPlacemarkClick);
}

function onFarmButtonClick(farmId) {
  if (domElements.detailPage.style.display !== 'none') {
    showMainPage(() => fitMapToViewport());
  }
  flyToFarm(farmId, farms);
}

function onPlacemarkClick(farmId) {
  const farm = farms.find((f) => f.id === farmId);
  if (farm) showDetailPage(farm);
}

// ─── Поиск — ИСПРАВЛЕН БАГ ───────────────────────────────────────────────────
const searchInput  = document.querySelector('.search-form input');
const searchButton = document.querySelector('.search-form button');

function handleSearch() {
  setSearchQuery(searchInput.value);
  fullUpdate();
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleSearch();
});

// Мгновенное обновление при каждом изменении поля (включая очистку)
searchInput.addEventListener('input', () => {
  handleSearch();
});

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
});

// ─── Навигация ────────────────────────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = e.currentTarget.dataset.page;

    document.getElementById('detail-page').style.display = 'none';
    const old = document.querySelector('.dynamic-page-wrapper');
    if (old) old.remove();

    closeBurgerMenu();

    if (pageId === 'main') {
      document.getElementById('main-page').style.display = 'flex';
      document.querySelector('.farm-sidebar').style.display = 'flex';
      fitMapToViewport();
    } else {
      document.getElementById('main-page').style.display = 'none';
      document.querySelector('.farm-sidebar').style.display = 'none';

      const app     = document.getElementById('app');
      const wrapper = document.createElement('div');
      wrapper.className = 'dynamic-page-wrapper';
      wrapper.innerHTML = getPageContent(pageId);
      app.appendChild(wrapper);
    }
  });
});

// ─── Бургер-меню ─────────────────────────────────────────────────────────────
const burgerBtn  = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay    = document.getElementById('burger-overlay');

function openBurgerMenu() {
  mobileMenu.classList.add('is-open');
  overlay.classList.add('is-visible');
  burgerBtn.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeBurgerMenu() {
  mobileMenu.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  burgerBtn.classList.remove('is-active');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('is-open')) {
    closeBurgerMenu();
  } else {
    openBurgerMenu();
  }
});

overlay.addEventListener('click', closeBurgerMenu);

// Крестик в мобильном меню
document.getElementById('mobile-menu-close').addEventListener('click', closeBurgerMenu);

// ─── Запуск ───────────────────────────────────────────────────────────────────
function startApp() {
  ymaps.ready(() => {
    initMap(ymaps, MAP_CENTER, 12);
    addPlacemarks(farms, onPlacemarkClick);
    renderFilteredButtons(farms, onFarmButtonClick);
    initFilterButtons(farms, onFarmButtonClick, fullUpdate);
    bindEvents(
      () => showMainPage(() => fitMapToViewport()),
      () => fitMapToViewport(),
    );
  });
}

document.addEventListener('DOMContentLoaded', startApp);
