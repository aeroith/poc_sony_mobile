import axios from 'axios';
import config from '../config/config';
import defaultTmdbConfig from './defaultTmdbConfig';

class TDMBClient {
  constructor() {
    this.configuration = {};
    this.baseUrl = config.tmdb.baseUrl;
    this.apiKey = config.tmdb.apiKey;
    this.logErrors = config.tmdb.logErrors;
  }

  getConfiguration() {
    return new Promise((resolve) => {
      if (Object.keys(this.configuration).length > 0) return resolve(this.configuration);
      axios.get(`${this.baseUrl}configuration?api_key=${this.apiKey}`)
        .then((response) => {
          this.configuration = response.data;
          resolve(response.data);
        })
        .catch((err) => {
          if (this.logErrors) console.log('Tmdb configuration fetch error:', err);
          this.configuration = defaultTmdbConfig;
          resolve(defaultTmdbConfig);
        });
    });
  }

  get(methodName, tmdbType, tmdbId) {
    return new Promise((resolve) => {
      if (!(tmdbType && tmdbId)) resolve({});
      this.getConfiguration().then(() => this[`get${methodName}`](tmdbType, tmdbId).then(resp => resolve(resp)));
    });
  }

  getDetails(tmdbType, tmdbId) {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${tmdbType}/${tmdbId}?api_key=${this.apiKey}`;
      return axios.get(url)
        .then(response => resolve(response.data))
        .catch((err) => {
          if (this.logErrors) console.log('Tmbd data fetch error: ', err);
          resolve({});
        });
    });
  }
}

export default new TDMBClient();
