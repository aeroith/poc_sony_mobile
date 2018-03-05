import axios from 'axios';
import conf from '../config/config';

class ApiClient {
  constructor(isNew) {
    this.instance = axios.create({
      baseURL: isNew ? conf.apiUrlNew : conf.apiUrl,
      timeout: 10000,
    });
  }
  get(url, config) {
    return this.instance.get(url, config);
  }
  post(url, body, config) {
    return this.instance.post(url, body, config);
  }
  put(url, body, config) {
    return this.instance.put(url, body, config);
  }
  delete(url, config) {
    return this.instance.delete(url, config);
  }
}

const apiClients = {
  ApiClientNew: new ApiClient(true),
  ApiClient: new ApiClient(),
};

module.exports = apiClients;
