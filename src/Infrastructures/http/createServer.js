const Hapi = require('@hapi/hapi');
const albums = require('../../Interfaces/http/api/albums');
const songs = require('../../Interfaces/http/api/songs');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const ClientError = require('../../Commons/exceptions/ClientError');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: albums,
      options: { container },
    },
    {
      plugin: songs,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', ({ response }, h) => {
    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }
      if (!translatedError.isServer) {
        return h.continue;
      }
      const newResponse = h.response({
        status: 'error',
        message: 'server error',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });
  return server;
};

module.exports = createServer;
