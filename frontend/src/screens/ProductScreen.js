import { getProduct } from '../api';
import { parseRequestUrl, setLoading } from '../utils';

import Rating from '../components/Rating';
import { getCartItems } from '../localStorage';

const ProductScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
      if (!addButton.classList.contains('disabled')) {
        localStorage.setItem('adding-item-to-cart', 'true');
        document.location.hash = `/cart/${request.id}`;
      }
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    setLoading(true);
    const product = await getProduct(request.id);
    setLoading(false);
    const cartItems = getCartItems();
    const currentProductInCart = cartItems.find(
      (item) => item.product === request.id
    );
    const cartQuantityOfCurrentProduct = currentProductInCart?.qty || 0;
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    const {
      image,
      name,
      rating,
      numReviews,
      price,
      description,
      countInStock,
    } = product;
    return `
      <div class="content">
        <div class="back-to-result">
          <a href="/#/">Back to result</a>
        </div>
        <div class="details">
          <div class="details-image">
            <img src=${image} alt="${name}"/>
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${name}</h1>
              </li>
              <li>
                ${Rating.render({
                  value: rating,
                  text: `${numReviews} reviews`,
                })}
              </li>
              <li>
                Price: <strong>$${price}</strong>
              </li>
              <li>
                Description:
                <div>${description}</div>
              </li>
            </ul>
          </div>
          <div class="details-action">
                <ul>
                  <li>
                    Price: $${price}
                  </li>
                  <li>
                    Status: 
                    ${
                      countInStock > cartQuantityOfCurrentProduct
                        ? `<span class="success">In Stock</span>`
                        : `<span class="error">Unavailable</span>`
                    }
                  </li>
                  <li>
                    <button id="add-button" class="primary fw ${
                      countInStock > cartQuantityOfCurrentProduct
                        ? ''
                        : 'disabled'
                    }">Add to Cart</button>
                  </li>
                </ul>
          </div>
        </div>
      </div>
      `;
  },
};

export default ProductScreen;
