import { cart } from '../../data/cart.js';

export function renderCheckoutHeader() {
  let totalQuantity = 0;

  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity;
  });

  const cartQuantityHTML =`
    Checkout (<a class="return-to-home-link"
            href="amazon.html">${totalQuantity} items</a>)
  `;

  document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = cartQuantityHTML;
}