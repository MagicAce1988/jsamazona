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
