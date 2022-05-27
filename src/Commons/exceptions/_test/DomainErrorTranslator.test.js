const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('ADD_ALBUM.NOT_CONTAINT_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Failed To Add Album Because Not Containt Needed Property!'));
    expect(DomainErrorTranslator.translate(new Error('ADD_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('Failed To Add Album Because The Data Not Meet Specification Type!'));
    expect(DomainErrorTranslator.translate(new Error('ADD_SONG.NOT_CONTAINT_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Failed To Add Song Because Not Containt Needed Property!'));
    expect(DomainErrorTranslator.translate(new Error('ADD_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('Failed To Add Song Because The Data Not Meet Specification Type!'));
  });
});
