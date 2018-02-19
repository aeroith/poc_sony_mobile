import ApiClient from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';

export default class SearchService {
  static getAutocompleteResults(query) {
    const lowerCaseQuery = query.toLowerCase();
    return ApiClient.get(`content?q=${lowerCaseQuery}`)
      .then(response => SearchService.getTMDBImages(response.data, 'w92'))
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
