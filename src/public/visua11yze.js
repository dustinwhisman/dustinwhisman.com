const getDeepestDirectDiv = (selector = 'div > div', depth = 2, lastElement = null) => {
  const element = document.querySelector(selector);
  if (!element) {
    return {
      element: lastElement,
      selector,
      depth,
    };
  }

  return getDeepestDirectDiv(selector + ' > div', depth + 1, element);
};

const getDeepestDiv = (selector = 'div div', depth = 2, lastElement = null) => {
  const element = document.querySelector(selector);
  if (!element) {
    return {
      element: lastElement,
      selector,
      depth,
    };
  }

  return getDeepestDiv(selector + ' div', depth + 1, element);
};

const checkSiteForIssues = () => {
  console.log('Deepest direct div:', getDeepestDirectDiv());
  console.log('Deepest div:', getDeepestDiv());
};

checkSiteForIssues();
