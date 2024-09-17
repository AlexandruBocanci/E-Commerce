import { orders } from './orders.js';
import { getProduct, loadProductsFetch } from './products.js';

await loadProductsFetch();

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const productId = urlParams.get('productId');
const product = getProduct(productId);

let productQuantity;
let deliveryDate;

// Find the relevant order and product
orders.forEach(order => {
    if (order.id === orderId) {
        order.products.forEach(productItem => {
            if (productItem.productId === productId) {
                productQuantity = productItem.quantity;
            }
        });

        // Retrieve the delivery date from localStorage
        deliveryDate = localStorage.getItem(`deliveryDate-${productId}`);
    }
});

// Format the date for display
const formattedDate = deliveryDate ? new Date(deliveryDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
}) : 'Unknown';

const trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formattedDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productQuantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
`;

document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
