import { orders } from "./orders.js";
import { getProduct, loadProductsFetch } from "./products.js";
import { formatCurrency } from '../scripts/utils/money.js';
import { addToCart, cart } from "./cart.js";

export async function orderHistory(orders) {
  await loadProductsFetch();

  let allOrdersHTML = '';

  orders.forEach(order => {
    let productsHTML = '';

    const orderDate = new Date(order.orderTime);
    const day = orderDate.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = orderDate.toLocaleDateString('en-GB', { month: 'long' });

    order.products.forEach(product => {
      const productID = product.productId;
      const matchingProduct = getProduct(productID);

      if (matchingProduct) {
        productsHTML += `
          <div class="product-image-container">
            <img src="${matchingProduct.image}" alt="${matchingProduct.name}">
          </div>
          <div class="product-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-delivery-date">
              Arriving on: August 15
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy it again">
              <span class="buy-again-message" data-product-id="${product.productId}">Buy it again</span>
            </button>
          </div>
          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${productID}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `;
      } else {
        console.log(`Product not found: ${productID}`);
      }
    });

    const orderHistoryHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${month} ${day}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
    `;

    allOrdersHTML += orderHistoryHTML;
  });

  document.querySelector('.js-order-grid').innerHTML = allOrdersHTML;

  document.addEventListener('click', function(event) {
    if (event.target.matches('.buy-again-message')) {
      const productId = event.target.getAttribute('data-product-id');
      addToCart(productId);
    }
  });
}

orderHistory(orders);
updateCartQuantity();

function updateCartQuantity() {
  let cartQuantity = 0;

      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}