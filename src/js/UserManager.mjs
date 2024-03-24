import { alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class UserManager {
  constructor() {
  }
  
  async login(form) {
    const json = formDataToJSON(form);
    try {
      const res = await services.login(json);
      alertMessage(`${res}.`);
    } catch (err) {
      removeAllAlerts();
      if(Array.isArray(err.message)){
        err.message.forEach(error => {
          alertMessage(`${error}.`);
        });
      } else{
        alertMessage(`${err.message}.`);
      }
    }
  }

  async registerUser(form) {
    const json = formDataToJSON(form);
    try {
      const res = await services.registerUser(json);
      window.location.replace("registerSuccess.html");
    } catch (err) {
      removeAllAlerts();
      if(Array.isArray(err.message)){
        err.message.forEach(error => {
          alertMessage(`${error}.`);
        });
      } else{
        alertMessage(`${err.message}.`);
      }
    }
  }
}