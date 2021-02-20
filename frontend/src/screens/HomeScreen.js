import axios from 'axios';
import { getProducts } from '../api';
import Rating from '../components/Rating';

const HomeScreen = {
  after_render: () => {},
  render: async () => {
    const products = await getProducts();
    if (products.error) {
      return `
      <div class="error">${products.error}</div>
      `;
    }
    return `
    <ul class="products">
    ${products
      .map(
        ({ _id, image, name, brand, price, rating, numReviews }) => `
    <li>
        <div class="product">
            <a href="/#/product/${_id}">
                <img src="${image}" alt="${name}" />
            </a>
            <div class="product-name">
                <a href="/#/product/1"> ${name} </a>
            </div>
            <div class="product-rating">${Rating.render({
              value: rating,
              text: `${numReviews} reviews`,
            })}</div>
            <div class="product-brand">${brand}</div>
            <div class="product-price">$${price}</div>
        </div>
    </li>
    `
      )
      .join('\n')}
    </ul>
    `;
  },
};

export default HomeScreen;
