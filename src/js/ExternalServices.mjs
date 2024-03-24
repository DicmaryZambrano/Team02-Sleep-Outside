const BASEURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const responseBody = await res.json();
  if (res.ok) {
    return responseBody;
  } else {
    let errorMessages = [];

    // Check if the responseBody has specific errors we're interested in
    if (responseBody.cardNumber) {
      errorMessages.push(`Card Number Error: ${responseBody.cardNumber}`);
    }
    if (responseBody.expiration) {
      errorMessages.push(`Expiration Error: ${responseBody.expiration}`);
    }
    
    // Fallback for generic or other specific errors
    if (errorMessages.length === 0) {
      if (responseBody.message) {
        errorMessages.push(responseBody.message);
      } else {
        try {
          // Attempt to use a stringified version of the response if available
          errorMessages.push(JSON.stringify(responseBody));
        } catch {
          // Use a generic error message as a last resort
          errorMessages.push('An unknown error occurred');
        }
      }
    }
    throw { name: 'servicesError', message: errorMessages };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(BASEURL + `/products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(BASEURL + `/product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    const response = await fetch(BASEURL + "/checkout/", options);
    const data = await convertToJson(response); 
    return data; 
  }
}