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
          if (this.logErrors) console.log('TMDB configuration fetch error:', err);
          this.configuration = defaultTmdbConfig;
          resolve(defaultTmdbConfig);
        });
    });
  }

  generatePosterPath(tmdbDetailsObj, imageSize) {
    if (!this.configuration) {
      console.log('Fetch TMDB configuration first to get the secure_base_url');
      return '';
    }
    const getImageSize = (sizeString) => {
      if (sizeString && this.configuration.images.poster_sizes.indexOf(sizeString)) {
        return sizeString;
      }
      return this.configuration.images.poster_sizes[0];
    };
    const imagePath = tmdbDetailsObj.poster_path || tmdbDetailsObj.backdrop_path;
    const generatedImageSize = getImageSize(imageSize);
    return imagePath
      ? `${this.configuration.images.secure_base_url}${generatedImageSize}${imagePath}`
      : '';
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
          if (this.logErrors) console.log('TMDB data fetch error: ', err);
          resolve({});
        });
    });
  }
}

export default new TDMBClient();
