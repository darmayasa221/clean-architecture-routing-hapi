const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'ADD_ALBUM.NOT_CONTAINT_NEEDED_PROPERTY': new InvariantError('Failed To Add Album Because Not Containt Needed Property!'),
  'ADD_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Failed To Add Album Because The Data Not Meet Specification Type!'),
  'ADD_SONG.NOT_CONTAINT_NEEDED_PROPERTY': new InvariantError('Failed To Add Song Because Not Containt Needed Property!'),
  'ADD_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Failed To Add Song Because The Data Not Meet Specification Type!'),
};

module.exports = DomainErrorTranslator;
