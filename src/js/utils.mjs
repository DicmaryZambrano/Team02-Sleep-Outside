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
// Custom Alert Message
export function alertMessage(message, scroll = true) {
  // Create element to hold our alert
  const alert = document.createElement('div');
  alert.classList.add('alert');
  // Set the contents. Include a message and an X for closing the alert
  alert.innerHTML = `${message} <span class="close-btn">&times;</span>`;
  alert.addEventListener('click', function(e) {
    if(e.target.classList.contains('close-btn')) { // Checks if the clicked element is our "X"
      this.remove(); // or use main.removeChild(this) if this does not work in your environment
    }
  });

  // Add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);

  // Make sure they see the alert by scrolling to the top of the window
  if(scroll) {
    window.scrollTo(0,0);
  }
}

export function removeAllAlerts() {
  // Select all elements with the class 'alert'
  const alerts = document.querySelectorAll('.alert');

  // Loop through the NodeList of alerts and remove each from the DOM
  alerts.forEach(alert => alert.remove());
}