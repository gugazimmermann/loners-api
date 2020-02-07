const viewsRoute = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      const data = {
        title: 'This is Index!',
        message: 'Hello, World. You crazy handlebars layout',
        context: 'index',
      };

      return reply.view('index', data);
    },
  },
  {
    method: 'GET',
    path: '/about-us',
    handler: (request, reply) => {
      const data = {
        title: 'About Loners API!',
        message: 'A little bit about the app',
        context: 'about-us',
      };

      return reply.view('about-us', data);
    },
  },
];

module.exports = viewsRoute;
