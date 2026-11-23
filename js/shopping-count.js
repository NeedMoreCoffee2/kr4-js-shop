function updateCartCounter(){
    const quantity = document.querySelector('#shopping-count');
    const rawQuantity = localStorage.getItem('cartItems');
    const arrayQuantity = rawQuantity ? JSON.parse(rawQuantity) : [];
    quantity.textContent = `Корзина. Товаров: ${arrayQuantity.length}`;
}
updateCartCounter();