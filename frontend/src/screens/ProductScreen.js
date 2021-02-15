import { getProduct } from '../api';
import { parseRequestUrl } from '../utils';

import Rating from '../components/Rating';

const ProductScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
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
                      countInStock > 0
                        ? `<span class="success">In Stock</span>`
                        : `<span class="error">Unavailable</span>`
                    }
                  </li>
                  <li>
                    <button id="add-button" class="primary fw">Add to Cart</button>
                  </li>
                </ul>
          </div>
        </div>
      </div>
      `;
  },
};

export default ProductScreen;
