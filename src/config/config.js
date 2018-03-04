const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3005/api/v1',
  dummyImageUrl: 'https://dummyimage.com/50x50/e0e0e0/0011ff.png',
  tmdb: {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '095bf7ea590ff61e3945845663ff88ee',
    readAccessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTViZjdlYTU5MGZmNjFlMzk0NTg0NTY2M2ZmODhlZSIsInN1YiI6IjVhOGE4MjA1MGUwYTI2NTQwYzA2ZjdlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgySAPdocMc_1_n4TBCv3KBgzbssE05ebVBs-b1YWL0',
    logErrors: false,
  },
};

export default config;
