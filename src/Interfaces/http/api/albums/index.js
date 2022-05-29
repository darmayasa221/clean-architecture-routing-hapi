const AlbumsHandlers = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  register: async (server, { container }) => {
    const albumsHandlers = new AlbumsHandlers(container);
    server.route(routes(albumsHandlers));
  },
};
