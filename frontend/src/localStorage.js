export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItems;
};

export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  token = '',
  isAdmin = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ _id, name, email, token, isAdmin })
  );
};

export const getUserInfo = () =>
  localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {
        _id: '',
        name: '',
        email: '',
        token: '',
        isAdmin: '',
      };
