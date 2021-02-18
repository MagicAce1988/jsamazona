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

export const deleteUserInfo = () => localStorage.removeItem('userInfo');

export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      };
  return shipping;
};

export const setShipping = ({
  address = '',
  city = '',
  postalCode = '',
  country = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify({ address, city, postalCode, country })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {
        paymentMethod: 'Paypal',
      };
  return payment;
};

export const setPayment = ({ paymentMethod = 'Paypal' }) => {
  localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => localStorage.removeItem('cartItems');
