import { getCartItems } from './localStorage';

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const [, resource, id, action] = url.split('/');
  return {
    resource,
    id,
    action,
  };
};

export const reRender = async (component) => {
  document.getElementById(
    'main-container'
  ).innerHTML = await component.render();
  if (component.after_render) await component.after_render();
};

export const setLoading = (state) => {
  document
    .getElementById('loading-overlay')
    .classList[state ? 'add' : 'remove']('active');
};

export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document
    .getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
      document.getElementById('message-overlay').classList.remove('active');
      if (callback) {
        callback();
      }
    });
};

export const redirectUser = () => {
  if (getCartItems().length) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
};
