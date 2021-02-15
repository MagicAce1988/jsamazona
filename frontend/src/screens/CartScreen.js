import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl } from '../utils';

const addToCart = (item, forceUpdate) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (cartItem) => cartItem.product === item.product
  );
  if (existItem) {
    cartItems = cartItems.map((cartItem) =>
      cartItem.product === existItem.product
        ? { ...existItem, qty: existItem.qty + 1 }
        : cartItem
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartScreen = {
  after_render: async () => {},
  render: async () => {
    const request = parseRequestUrl();
    const validCartAdd = localStorage.getItem('adding-item-to-cart') === 'true';
    if (request.id && validCartAdd) {
      localStorage.removeItem('adding-item-to-cart');
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();

    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          ${
            !cartItems.length
              ? '<div>Cart is empty. <a href="/#/>Go Shopping</a></div>'
              : cartItems
                  .map(
                    (cartItem) => `
              <li>
                <div class="cart-image">
                  <img src="${cartItem.image}" src="${cartItem.name}"/>
                </div>
                <div class="cart-name">
                  <div>
                    <a href="/#/product/${cartItem.product}">${cartItem.name}</a>
                  </div>
                  <div>
                    Qty: <select class="qty-select" id="${cartItem.product}">
                      <option value="1">1</option>
                    </select>
                    <button type="button" class="delete-button" id="${cartItem.product}">Delete</button>
                  </div>
                </div>
                <div class="cart-price">
                  $${cartItem.price}
                </div>
              </li>
              `
                  )
                  .join('\n')
          }
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal (${cartItems.reduce((acc, val) => acc + val.qty, 0)} items)
            :
            $${cartItems.reduce((acc, val) => acc + val.qty * val.price, 0)}
          </h3>
          <button id="checkout-button" class="primary fw ${
            !cartItems.length ? 'disabled' : ''
          }">
            Proceed to checkout
          </button>
      </div>
    </div>
    `;
  },
};

export default CartScreen;
