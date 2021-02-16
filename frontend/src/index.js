import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SignInScreen from './screens/SignInScreen';
import { parseRequestUrl } from './utils';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart': CartScreen,
  '/cart/:id': CartScreen,
  '/signin': SignInScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.action ? `/${request.action}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
