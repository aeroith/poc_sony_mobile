import ApiClient from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';

export default class SearchService {
  static getAutocompleteResults(query) {
    const lowerCaseQuery = query.toLowerCase();
    return ApiClient.get(`content?q=${lowerCaseQuery}`)
      .then(response => response.data)
      .then(data => SearchService.getTMDBImages(data, 'w92'))
      .catch(err => console.log(err));
  }

  static getTMDBImages(data, imageSize) {
    return Promise.all(data.map(item => TMDBClient.get('Details', item.tmdbTypes[0], item.tmdbID)))
      .then(items => items.map((item, index) => {
        const tmdbImagePath = `${TMDBClient.configuration.images.secure_base_url}${imageSize}${item.poster_path || item.backdrop_path}`;
        return {
          ...data[index],
          tmdbImagePath,
        };
      }))
      .catch(err => console.log(err));
  }
}
