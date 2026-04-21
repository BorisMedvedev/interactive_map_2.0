// DOM-элементы (будут переданы при инициализации)
let mainPage, detailPage, farmButtonsContainer;
let detailTitle, detailDesc, detailImg, detailCoordsSpan, productSpan, backBtn, productTel, productEmail, additionalInfo;

// Инициализация ссылок на элементы
export function initUI(elements) {
  mainPage = elements.mainPage;
  detailPage = elements.detailPage;
  farmButtonsContainer = elements.farmButtonsContainer;
  detailTitle = elements.detailTitle;
  detailDesc = elements.detailDesc;
  detailImg = elements.detailImg;
  detailCoordsSpan = elements.detailCoordsSpan;
  productSpan = elements.productSpan;
  backBtn = elements.backBtn;
  productTel = elements.productTel;
  productEmail = elements.productEmail;
  additionalInfo = elements.additionalInfo;
}

// Отрисовка кнопок ферм в боковой панели
export function renderFarmButtons(farms, onFarmClick) {
  farmButtonsContainer.innerHTML = '';
  farms.forEach(farm => {
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

// Показать детальную страницу фермы
export function showDetailPage(farm) {
  detailTitle.textContent = farm.name;
  detailDesc.textContent = farm.description;
  detailImg.src = farm.photo;
  detailImg.alt = farm.name;
  detailCoordsSpan.textContent = `${farm.coords[0].toFixed(4)}, ${farm.coords[1].toFixed(4)}`;
  productSpan.textContent = farm.product;
  productTel.textContent = farm.phone;
  productEmail.textContent = farm.email;
  additionalInfo.textContent = farm.additionalInfo;

  mainPage.style.display = 'none';
  detailPage.style.display = 'flex';
  detailPage.scrollTop = 0;
}

// Вернуться на главную (карту)
export function showMainPage(onMapFit) {
  detailPage.style.display = 'none';
  mainPage.style.display = 'flex';
  if (onMapFit) onMapFit();

  // Сбросить подсветку кнопок
  document.querySelectorAll('.farm-btn').forEach(btn => btn.style.background = '#f3e9c0');
}

// Подписка на глобальные события (кнопка Назад, resize)
export function bindEvents(onBackClick, onResizeFit) {
  backBtn.addEventListener('click', onBackClick);
  window.addEventListener('resize', () => {
    if (mainPage.style.display !== 'none') onResizeFit();
  });
}