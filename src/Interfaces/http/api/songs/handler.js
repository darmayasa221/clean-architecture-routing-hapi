const SongUseCase = require('../../../../Applications/use_case/SongUseCase');

class SongsHandlers {
  constructor(container) {
    this._container = container;
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler({ payload }, h) {
    const songUseCase = this._container.getInstance(SongUseCase.name);
    const { id } = await songUseCase.addSong(payload);
    const response = h.response({
      status: 'success',
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const songUseCase = this._container.getInstance(SongUseCase.name);
    const songs = await songUseCase.getSongs();
    return h.response({
      status: 'success',
      data: {
        songs,
      },
    });
  }

  async getSongByIdHandler({ params }, h) {
    const songUseCase = this._container.getInstance(SongUseCase.name);
    const song = await songUseCase.getSongById(params);
    return h.response({
      status: 'success',
      data: {
        song,
      },
    });
  }

  async putSongByIdHandler({ params, payload }, h) {
    const songUseCase = this._container.getInstance(SongUseCase.name);
    await songUseCase.editSongById({ ...params, ...payload });
    return h.response({
      status: 'success',
      message: 'updated success',
    });
  }

  async deleteSongByIdHandler({ params }, h) {
    const songUseCase = this._container.getInstance(SongUseCase.name);
    await songUseCase.deleteSongById(params);
    return h.response({
      status: 'success',
      message: 'deleted success',
    });
  }
}

module.exports = SongsHandlers;
