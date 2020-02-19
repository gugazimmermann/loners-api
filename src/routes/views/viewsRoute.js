const Path = require('path');

const viewsRoute = [
  {
    path: '/public/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: Path.join(__dirname, '../../views/public'),
        listing: false,
      },
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: (res, _h) => {
      const data = {
        title: 'Loners API!',
        message: 'A little bit about the amazing app',
        context: 'index',
      };
      return _h.view('index', data);
    },
  },
  {
    method: 'GET',
    path: '/about-us',
    handler: (res, _h) => {
      const data = {
        title: 'About Loners API!',
        message: 'A little bit about the app',
        context: 'about-us',
      };
      return _h.view('about-us', data);
    },
  },
];

module.exports = viewsRoute;
