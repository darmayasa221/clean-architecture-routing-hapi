class VerifyParamsSong {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      songId,
    } = payload;
    this.id = songId;
  }

  _verifyPayload({ songId }) {
    if (!songId) {
      throw new Error('VERIFY_PARAMS_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
    }
    if (typeof songId !== 'string') {
      throw new Error('VERIFY_PARAMS_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = VerifyParamsSong;
