import { ApiClient, ApiClientNew } from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';

export default class SearchService {
  static getAutocompleteResults(query) {
    const lowerCaseQuery = query.toLowerCase();
    ApiClientNew.get(`programs?q=${lowerCaseQuery}`)
        .then(response => console.log('programs query', response))
        .catch(e => console.log(e));
    return ApiClient.get(`content?q=${lowerCaseQuery}`)
      // TODO: w92 should be taken from tmdb configuration
      .then(response => {
          console.log('content query: ', response.data);
          SearchService.getTMDBImages(response.data, 'w92');
      })
      .catch(err => console.log(err));
  }

  static getTMDBImages(data, imageSize) {
    const promiseAllData = data.map(item => TMDBClient.get(
      'Details',
      item.tmdbTypes ? item.tmdbTypes[0] : '',
      item.tmdbID || ''
    ));
    return Promise.all(promiseAllData)
      .then(items => items.map((item, index) => {
        const imagePath = item.poster_path || item.backdrop_path;
        const tmdbImagePath = imagePath ? `${TMDBClient.configuration.images.secure_base_url}${imageSize}${imagePath}` : null;
        return {
          ...data[index],
          tmdbImagePath,
        };
      }))
      .catch(err => console.log(err));
  }
}
