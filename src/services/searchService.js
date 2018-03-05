import { ApiClientNew } from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';

export default class SearchService {
  static getAutocompleteResults(query) {
    const lowerCaseQuery = query.toLowerCase();
    return ApiClientNew.get(`programs?q=${lowerCaseQuery}`)
      // TODO: w92 should be taken from tmdb configuration
      .then(response => SearchService.getTMDBImages(response.data.data, 'w92'))
      .catch(err => console.log(err));
  }

  static getTMDBImages(data, imageSize) {
    const promiseAllData = data.map(item => TMDBClient.get(
      'Details',
      item.type || '',
      item.tmdb_id || ''
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
