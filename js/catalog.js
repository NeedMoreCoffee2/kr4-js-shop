const productsContainer = document.querySelector('.products-grid');
const searchInput = document.querySelector('#catalog-search');
const filterAll = document.querySelector('#all');
const filterSale = document.querySelector('#sales');
const filterInStock = document.querySelector('#inStock');
// console.log(JSON.parse(categoryFilter));
console.log(filterAll);
console.log(filterSale);
console.log(filterInStock);
const sortSelect = document.querySelector('#sort-select');
console.log(sortSelect);
const catalogCount = document.querySelector('.catalog-count');
const catalogEmpty = document.querySelector('.catalog-empty');
const priceLeft = document.querySelector('#price-from');
const priceRight = document.querySelector('#price-to');

if (!productsContainer) {
  console.warn('Контейнер товаров не найден.');
}

let catalogState = {
  query: '',
  filters: [true, false, false],
  price: [0, Number.MAX_SAFE_INTEGER],
  sort: 'default'
};


function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');

  const image = document.createElement('img');
  image.classList.add('product-card__img');
  image.src = product.img;
  image.alt = product.title;

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;

  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.textContent = product.content;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  price.textContent = formatPrice(product.price + product.price * product.sale / 100);

  const status = document.createElement('p');
  status.classList.add('product-card__status');
  if(product.sale !== 0) {
    status.textContent = `Скидка: ${product.sale}%`;
    status.classList.add('success');
  }
  else status.textContent = 'Без скидки';

  const button = document.createElement('button');
  button.classList.add('button', 'button--primary', 'product-card__button');
  button.type = 'button';
  button.textContent = 'В корзину';
  button.dataset.action = 'add-to-cart';
  button.dataset.productId = String(product.id);

  if (!product.isAvailable) {
    button.disabled = true;
    button.textContent = 'Нет в наличии';
  }

  const a = document.createElement('a');
  a.classList.add('button', 'button--secondary', 'product-card__button');
  a.type = 'button';
  a.textContent = 'Подробнее'
  a.href = `product.html?id=${String(product.id)}`;
  a.dataset.productId = String(product.id);

  const div = document.createElement('div');
  div.classList.add("buttons-block");

  div.append(button, a);
  card.append(image, title, description, price, status, div);

  return card;
}

function renderProducts(productsToRender) {
  productsContainer.textContent = '';

  if (catalogCount) {
    catalogCount.textContent = `Найдено товаров: ${productsToRender.length}`;
  }

  if (catalogEmpty) {
    catalogEmpty.hidden = productsToRender.length > 0;
  }

  productsToRender.forEach((product) => {
    const card = createProductCard(product);
    productsContainer.append(card);
  });
}

function getPreparedProducts(products, catalogState) { //products, query, filters, sortDirection
  let result = [...products];

  if (catalogState.filters[0]) result = filterProductsAll(result);
  if (catalogState.filters[1]) result = filterIsAlailable(result);
  if (catalogState.filters[2]) result = filterIsSale(result);
  result = searchProducts(result, catalogState.query);
  if(catalogState.price[0] >= 0) {
    result = result.filter((product) => product.price >= catalogState.price[0]);
  }
  if(catalogState.price[1] <= Number.MAX_SAFE_INTEGER) {
    result = result.filter((product) => product.price <= catalogState.price[1]);
  }
  result = sortProductsByPrice(result, catalogState.sort);

  return result;
}

function updateCatalog() {
  const preparedProducts = getPreparedProducts(products, catalogState);
  renderProducts(preparedProducts);
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    catalogState.query = event.target.value;
    updateCatalog();
  });
}

// if (categoryFilter) {
//   categoryFilter.addEventListener('change', (event) => {
//     catalogState.category = event.target.value;
//     updateCatalog();
//   });
// }

// if (filterAll) {
//     filterAll.addEventListener('change', (event) => {
//         if (event.target.) catalogState.filters[0] = true;
//         else catalogState.filters[0] = false;
//     updateCatalog();
//     });
// }

// if (filterInStock) {
//     filterInStock.addEventListener('change', (event) => {
//         if (event.target.value) catalogState.filters[1] = true;
//         else catalogState.filters[1] = false;
//     updateCatalog();
//     });
// }

// if (filterSale) {
//     filterSale.addEventListener('change', (event) => {
//         if (event.target.value) catalogState.filters[2] = true;
//         else catalogState.filters[2] = false;
//     updateCatalog();
//     });
// }

if (filterAll) {
  filterAll.addEventListener('change', (event) => {
    catalogState.filters[0] = event.target.checked;
    updateCatalog();
  });
}

if (filterInStock) {
  filterInStock.addEventListener('change', (event) => {
    catalogState.filters[1] = event.target.checked;
    updateCatalog();
  });
}

if (filterSale) {
  filterSale.addEventListener('change', (event) => {
    catalogState.filters[2] = event.target.checked;
    updateCatalog();
  });
}

if (priceLeft) {
    priceLeft.addEventListener('input', (event) => {
        catalogState.price[0] = Number(event.target.value);
        updateCatalog();
    });
}

if (priceRight) {
    priceRight.addEventListener('input', (event) => {
        catalogState.price[1] = Number(event.target.value);
        updateCatalog();
    });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (event) => {
    catalogState.sort = event.target.value;
    updateCatalog();
  });
}

if (productsContainer) {
  updateCatalog();
}

const cartCounter = document.querySelector('.cart-counter');
const cartItems = 'cartItems';

// function updateCartCounter() {
//   if (cartCounter) {
//     cartCounter.textContent = `Корзина. Товаров: ${localStorage.length}`;
//   }
// }
function findProductById(products, id) {
  return products.find((product) => product.id === id);
}


if (productsContainer) {
  productsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="add-to-cart"]');

    if (!button) {
      return;
    }

    const productID = Number(button.dataset.productId);
    const selectedProduct = products.find((product) => product.id === productID);

    if (!selectedProduct) {
      console.warn('Товар не найден:', productID);
      return;
    }

    console.log(`Товар добавлен в корзину: ${selectedProduct.title}`);

    const rawArray = localStorage.getItem(cartItems);
    let array = rawArray ? JSON.parse(rawArray) : [];

    if(!findProductById(array, productID)) array.push(selectedProduct);     //localStorage.setItem(String(productID), selectedProduct);
    else {
        // array[productID - 1].count += 1;
        const productIndex = array.findIndex((product) => product.id === productID);
        array[productIndex].count += 1;
    }
    localStorage.clear();
    localStorage.setItem('cartItems', JSON.stringify(array));
    updateCartCounter();
  });
}