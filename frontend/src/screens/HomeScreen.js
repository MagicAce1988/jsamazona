import axios from 'axios';

const HomeScreen = {
  after_render: () => {},
  render: async () => {
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response || response.statusText !== 'OK') {
      return `<div>Error in getting data</div>`;
    }
    const products = response.data;
    return `
    <ul class="products">
    ${products
      .map(
        ({ _id, image, name, brand, price }) => `
    <li>
        <div class="product">
            <a href="/#/product/${_id}">
                <img src="${image}" alt="${name}" />
            </a>
            <div class="product-name">
                <a href="/#/product/1"> ${name} </a>
            </div>
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
