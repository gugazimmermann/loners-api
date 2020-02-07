const viewsRoute = [
  {
    method: 'GET',
    path: '/',
    handler: (res, _h) => {
      const data = {
        title: 'This is Index!',
        message: 'Hello, World. You crazy handlebars layout',
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
