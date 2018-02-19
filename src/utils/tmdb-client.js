import axios from 'axios';
import config from '../config/config';
import defaultTmdbConfig from './defaultTmdbConfig';

class TDMBClient {
  constructor() {
    this.configuration = {};
    this.baseUrl = config.tmdb.baseUrl;
    this.apiKey = config.tmdb.apiKey;
  }

  getConfiguration() {
    return new Promise((resolve, reject) => {
      if (Object.keys(this.configuration).length > 0) return resolve(this.configuration);
      axios.get(`${this.baseUrl}configuration?api_key=${this.apiKey}`)
        .then((response) => {
          this.configuration = response.data;
          resolve(response.data);
        })
        .catch((err) => {
          console.log('Tmdb configuration fetch error:', err);
          this.configuration = defaultTmdbConfig;
          resolve(defaultTmdbConfig);
        });
    });
  }

  get(methodName, tmdbType, tmdbId) {
    return this.getConfiguration().then(() => this[`get${methodName}`](tmdbType, tmdbId));
  }

  getDetails(tmdbType, tmdbId) {
    const url = `${this.baseUrl}${tmdbType}/${tmdbId}?api_key=${this.apiKey}`;
    console.log('url: ', url);
    return axios.get(url)
      .then(response => response.data)
      .catch(err => err);
  }
}

export default new TDMBClient();
