function formatPrice(price) {
  return `${price} руб.`;
}

console.log(formatPrice(products[0].price));

function calculateDiscount(price, salePercent) {
  return price * salePercent / 100;
}

const discountValue = calculateDiscount(products[0].price, products[0].sale);

console.log(discountValue);


function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

const finalPrice = calculateFinalPrice(products[0].price, products[0].sale);

console.log(finalPrice);


function getProductStatus(product) {
  if (products[0].isAvailable) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

console.log(getProductStatus(products[0]));


function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.sale);
  const status = getProductStatus(product);

  return `${product.title}: ${formatPrice(finalPrice)} Статус: ${status}.`;
}

const productSummary = createProductSummary(products[0]);

console.log(productSummary);


// const messageElement = document.querySelector('.js-message');
// const productOutputElement = document.querySelector('.product-output');
// messageElement.textContent = 'JavaScript подключён корректно.';
// productOutputElement.textContent = productSummary;

///////////////////////////////////
console.log(1);

function getProductTitles(products) {
  return products.map((product) => product.title);
}

const productTitles = getProductTitles(products);

console.log(productTitles);


function getAvailableProducts(products) {
  return products.filter((product) => product.isAvailable);
}

const availableProducts = getAvailableProducts(products);

console.table(availableProducts);


function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return products;
  }

  return products.filter((product) => {
    return product.title.toLowerCase().includes(normalizedQuery);
  });
}

const searchResult = searchProducts(products, 'из франц');

console.table(searchResult);


function filterProductsAll(products) {
    return products;
}

const AllProducts = filterProductsAll(products);

console.table(AllProducts);

function filterIsAlailable(products) {
    return getAvailableProducts(products);
}

function filterIsSale(products) {
    return products.filter((product) => product.sale !== 0);
}

console.table(filterIsAlailable(products));
console.table(filterIsSale(products));

function sortProductsByPrice(products, direction = 'asc') {
  const productsCopy = [...products];

  if (direction === 'desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }

  return productsCopy.sort((a, b) => a.price - b.price);
}

const productsSortedByPrice = sortProductsByPrice(products, 'asc');

console.table(productsSortedByPrice);


function findProductById(products, id) {
  return products.find((product) => product.id === id);
}

const selectedProduct = findProductById(products, 3);

if (selectedProduct) {
  console.log(`Найден товар: ${selectedProduct.title}`);
} else {
  console.log('Товар не найден');
}

function calculateTotalPrice(products) {
  return products.reduce((sum, product) => {
    return sum + product.price;
  }, 0);
}

const totalPrice = calculateTotalPrice(products);

console.log(totalPrice);

function countAvailableProducts(products) {
  return products.filter((product) => product.isAvailable).length;
}

const availableCount = countAvailableProducts(products);

console.log(availableCount);


function calculateAveragePrice(products) {
  if (products.length === 0) {
    return 0;
  }

  const totalPrice = calculateTotalPrice(products);
  return Math.round(totalPrice / products.length);
}

const averagePrice = calculateAveragePrice(products);

console.log(averagePrice);


function getPreparedProducts(products, query, filters, sortDirection) {
  let result = [...products];

  //if (!filters[0]) result = filterProductsAll(products);
  if (filters[1]) result = filterIsAlailable(products);
  if (filters[2]) result = filterIsSale(products);
  result = searchProducts(result, query);
  //result = filterProductsByCategory(result, category);
  result = sortProductsByPrice(result, sortDirection);

  return result;
}

const preparedProducts = getPreparedProducts(products, '', [false, true, false], 'asc');

console.table(preparedProducts);


const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');
if (messageElement) {
  messageElement.textContent = 'Массив товаров и функции обработки данных подключены.';
}

if (productOutputElement) {
  productOutputElement.textContent = [
    `Всего товаров: ${products.length}`,
    `Товаров в наличии: ${countAvailableProducts(products)}`,
    `Средняя цена: ${calculateAveragePrice(products)} руб.`,
    `Результатов поиска "гет": ${searchProducts(products, 'гет').length}`
  ].join('\n');
}