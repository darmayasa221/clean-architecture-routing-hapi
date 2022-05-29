/** istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const pool = require('./database/postgres/pool');

// service
const AlbumRepository = require('../Domains/albums/AlbumRepository');
const SongRepository = require('../Domains/songs/SongRepository');
const AlbumRepositoryPostgres = require('./repository/AlbumRepositoryPostgres');
const SongRepositoryPostgres = require('./repository/SongRepositoryPostgres');

// use case
const AlbumUseCase = require('../Applications/use_case/AlbumUseCase');
const SongUseCase = require('../Applications/use_case/SongUseCase');

// create container
const container = createContainer();
// register services
container.register([
  {
    key: AlbumRepository.name,
    Class: AlbumRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: SongRepository.name,
    Class: SongRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
]);

// regiser use case
container.register([
  {
    key: SongUseCase.name,
    Class: SongUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'songRepository',
          internal: SongRepository.name,
        },
      ],
    },
  },
  {
    key: AlbumUseCase.name,
    Class: AlbumUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'albumRepository',
          internal: AlbumRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
