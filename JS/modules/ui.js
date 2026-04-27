// ui.js — всё, что касается интерфейса: кнопки ферм, детальная страница, события

import { setFilter, filterFarms } from './filter.js';
import { applySearch } from './search.js';

let mainPage, detailPage, farmButtonsContainer;
let detailTitle, detailDesc, detailImg, detailCoordsSpan, productSpan, backBtn;
let productTel, productEmail, additionalInfo;

export function initUI(elements) {
  mainPage             = elements.mainPage;
  detailPage           = elements.detailPage;
  farmButtonsContainer = elements.farmButtonsContainer;
  detailTitle          = elements.detailTitle;
  detailDesc           = elements.detailDesc;
  detailImg            = elements.detailImg;
  detailCoordsSpan     = elements.detailCoordsSpan;
  productSpan          = elements.productSpan;
  backBtn              = elements.backBtn;
  productTel           = elements.productTel;
  productEmail         = elements.productEmail;
  additionalInfo       = elements.additionalInfo;
}

export function renderFilteredButtons(allFarms, onFarmClick) {
  let filtered = filterFarms(allFarms);
  filtered = applySearch(filtered);

  farmButtonsContainer.innerHTML = '';

  filtered.forEach((farm) => {
    const btn = document.createElement('button');
    btn.className = 'farm-btn';
    btn.setAttribute('data-farm-id', farm.id);

    const dotSpan = document.createElement('span');
    dotSpan.className = 'color-dot';
    dotSpan.style.backgroundColor = farm.color;

    btn.appendChild(document.createTextNode(farm.name));
    btn.appendChild(dotSpan);

    btn.addEventListener('click', () => onFarmClick(farm.id));
    farmButtonsContainer.appendChild(btn);
  });
}

export function initFilterButtons(allFarms, onFarmClick, onUpdateMap) {
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.filter;
      setFilter(category);
      onUpdateMap();
    });
  });

  document.querySelectorAll('.footer-filter-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = e.currentTarget.dataset.filter;
      setFilter(category);
      onUpdateMap();
      document.getElementById('yandex-map').scrollIntoView({ behavior: 'smooth' });
    });
  });

  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');
}

export function showDetailPage(farm) {
  detailTitle.textContent      = farm.name;
  detailDesc.textContent       = farm.description;
  detailImg.src                = farm.photo || './images/none.png';
  detailImg.alt                = farm.name;
  detailCoordsSpan.textContent = `${farm.coords[0].toFixed(4)}, ${farm.coords[1].toFixed(4)}`;
  productSpan.textContent      = farm.product;
  productTel.textContent       = farm.phone  || 'Не указан';
  productEmail.textContent     = farm.email  || 'Не указан';
  additionalInfo.textContent   = farm.additionalInfo || '';

  mainPage.style.display  = 'none';
  detailPage.style.display = 'flex';
  detailPage.scrollTop    = 0;
}

export function showMainPage(onMapFit) {
  detailPage.style.display = 'none';

  const dynWrapper = document.querySelector('.dynamic-page-wrapper');
  if (dynWrapper) dynWrapper.remove();

  mainPage.style.display = 'flex';
  document.querySelector('.farm-sidebar').style.display = 'flex';

  if (onMapFit) onMapFit();
}

export function bindEvents(onBackClick, onResizeFit) {
  backBtn.addEventListener('click', onBackClick);

  window.addEventListener('resize', () => {
    if (mainPage.style.display !== 'none') onResizeFit();
  });
}
