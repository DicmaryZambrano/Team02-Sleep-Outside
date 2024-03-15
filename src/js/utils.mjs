// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get product from query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}
// render html with a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const targetElement = document.querySelector(parentElement);

  if (clear) {
    targetElement.innerHTML = ""; // Clear out the contents if clear is true
  }

  const htmlStrings = list.map(templateFn);
  targetElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
// render html with a template function
export function renderWithTemplate(template, parentElement) {
  const targetElement = document.querySelector(parentElement);
  targetElement.insertAdjacentHTML("afterbegin", template);
}

// load the header and footer
export async function loadTemplate(path) {
  const html = await getTemplate(path)
  const template = document.createElement('template');
  template.innerHTML = html;
  return html;
}
// load the header and footer
export async function loadHeaderFooter(headerId,footerId,headerDom,footerDom) {
  const header = await loadTemplate(headerDom)
  const footer =  await loadTemplate(footerDom)

  renderWithTemplate(header, headerId)
  renderWithTemplate(footer, footerId)
}
// fetch DOM from partials
function getTemplate(path) {
  return fetch(path)
    .then(convertToText)
    .then((data) => data);
}
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}