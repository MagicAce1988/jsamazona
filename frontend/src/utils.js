export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const [, resource, id, action] = url.split('/');
  return {
    resource,
    id,
    action,
  };
};
