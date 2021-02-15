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
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
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
    return `
    <div>${getCartItems().length}</div>
    `;
  },
};

export default CartScreen;
