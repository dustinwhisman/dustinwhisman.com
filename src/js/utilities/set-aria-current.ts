export const setAriaCurrent = () => {
  const { pathname } = window.location;
  const trimmedPathname = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  const matchingLink = document.querySelector(`nav a[href^="${trimmedPathname}"]`);

  matchingLink?.setAttribute('aria-current', 'page');
};
