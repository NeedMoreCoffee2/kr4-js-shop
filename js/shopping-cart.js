const mainSection = document.querySelector('#card-all-list');
// const catalogCount = document.querySelector('')

// const rawDataStorage = localStorage.getItem('cartItems');
// const dataStorage = rawDataStorage ? JSON.parse(rawDataStorage) : [];

const deleteButton1 = document.querySelector('[data-action="delete-1"]');
const deleteButton = document.querySelector('[data-action="delete"]');

function getCart() {
  const raw = localStorage.getItem('cartItems');
  return raw ? JSON.parse(raw) : [];
}

let dataStorage = getCart();

function saveCart(cart) {
  localStorage.clear();
  localStorage.setItem('cartItems', JSON.stringify(cart));
  renderProducts(cart);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('shopping-card');

//   const image = document.createElement('img');
//   image.classList.add('product-card__img');
//   image.src = product.img;
//   image.alt = product.title;

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;

//   const description = document.createElement('p');
//   description.classList.add('product-card__description');
//   description.textContent = product.content;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  const copy = Number(product.price);
  price.textContent = `Цена за все копии: ${formatPrice(copy + copy * product.sale / 100)}`;
  if(product.sale !== 0) price.classList.add('success');

  const status = document.createElement('p');
  status.classList.add('product-card__status');
  status.textContent = `Количество: ${product.count}`;

  const button1 = document.createElement('button');
  button1.classList.add('button', 'button--primary', 'product-card__button');
  button1.type = 'button';
  button1.textContent = 'Удалить копию';
  button1.dataset.action = 'delete-1';
  button1.dataset.productId = String(product.id);

  const button = document.createElement('button');
  button.classList.add('button', 'button--secondary', 'product-card__button');
  button.type = 'button';
  button.textContent = 'Удалить все копии';
  button.dataset.action = 'delete';
  button.dataset.productId = String(product.id);

  const div = document.createElement('div');
  div.classList.add("shop-buttons-block");

  const divMain = document.createElement("div");
  divMain.classList.add('shop-content-block');

  divMain.append(title, price, status)
  div.append(button1, button);

  card.append(divMain, div);

  return card;
}

function renderProducts(productsToRender) {
  mainSection.textContent = '';

  updateCartCounter();

  if(dataStorage.length === 0) {
    const p = document.createElement('p');
    p.classList.add('shop-message');
    p.textContent = "Корзина пуста";
    mainSection.append(p);
    return;
  }

  productsToRender.forEach((product) => {
    const card = createProductCard(product);
    mainSection.append(card);
  });

  const buttonBuy = document.createElement('button');
  buttonBuy.classList.add('button', 'button--primary', 'product-card__button');
  buttonBuy.type = 'button';
  buttonBuy.textContent = 'Купить';
  buttonBuy.dataset.action = 'add-to-cart';

  const buttonDeleteAll = document.createElement('button');
  buttonDeleteAll.classList.add('button', 'button--secondary', 'product-card__button');
  buttonDeleteAll.type = 'button';
  buttonDeleteAll.textContent = 'Очистить корзину';
  buttonDeleteAll.dataset.action = 'delete-all';

  const div = document.createElement('div');
  div.classList.add("shoppy");
  div.append(buttonBuy, buttonDeleteAll);
  mainSection.append(div);
}

if (dataStorage.length === 0) {
    const p = document.createElement('p');
    p.classList.add('shop-message');
    p.textContent = "Корзина пуста";
    mainSection.append(p);
}

else {
    renderProducts(dataStorage);
}

mainSection.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    const action = actionButton.dataset.action;
    const productID = Number(actionButton.dataset.productId);

    dataStorage = getCart();

    if(action === 'delete-1') {
        const productIndex = dataStorage.findIndex((product) => product.id === productID);
    
        if (productIndex !== -1) {
        if (dataStorage[productIndex].count > 1) {
            dataStorage[productIndex].count -= 1;
        }
        else {
            dataStorage.splice(productIndex, 1);
        }
        saveCart(dataStorage);
        }
    }

    else if(action === 'delete') {
        const productIndex = dataStorage.findIndex((product) => product.id === productID);
        dataStorage.splice(productIndex, 1);
        saveCart(dataStorage);
    }

    else if(action === 'delete-all') {
        dataStorage = [];
        saveCart(dataStorage);
    }

});