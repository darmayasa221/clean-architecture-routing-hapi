class VerifyParamsAlbum {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      albumId,
    } = payload;
    this.id = albumId;
  }

  _verifyPayload({
    albumId,
  }) {
    if (!albumId) {
      throw new Error('VERIFY_PARAMS_ALBUM.NOT_CONTAINT_NEEDED_PROPERTY');
    }
    if (typeof albumId !== 'string') {
      throw new Error('VERIFY_PARAMS_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = VerifyParamsAlbum;
