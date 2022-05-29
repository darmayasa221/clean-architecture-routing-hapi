const SongsHandlers = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  register: async (server, { container }) => {
    const songsHandlers = new SongsHandlers(container);
    server.route(routes(songsHandlers));
  },
};
