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


const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');
messageElement.textContent = 'JavaScript подключён корректно.';
productOutputElement.textContent = productSummary;

