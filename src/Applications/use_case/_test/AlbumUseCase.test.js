const AlbumRepository = require('../../../Domains/albums/AlbumRepository');
const AddAlbum = require('../../../Domains/albums/entities/AddAlbum');
const AddedAlbum = require('../../../Domains/albums/entities/AddedAlbum');
const GetedAlbum = require('../../../Domains/albums/entities/GetedAlbum');
const VerifyParamsAlbum = require('../../../Domains/albums/entities/VerifyParamsAlbum');
const AlbumUseCase = require('../AlbumUseCase');

describe('AlbumUseCase', () => {
  describe('addAlbum', () => {
    it('should orchestrating the addAlbum correctly', async () => {
      // Arrange
      const useCasePayload = {
        name: 'album-name',
        year: '1234',
      };
      const expectedAddedAlbum = new AddedAlbum({
        id: 'album-0001',
      });
      const mockAlbumRepository = new AlbumRepository();
      /** mocking needed functiong */
      mockAlbumRepository.addAlbum = jest.fn()
        .mockImplementation(() => Promise.resolve(new AddedAlbum({
          id: 'album-0001',
        })));
      /** creating use case instance */
      const albumUseCase = new AlbumUseCase({
        albumRepository: mockAlbumRepository,
      });
      // Action
      const addedAlbum = await albumUseCase.addAlbum(useCasePayload);
      // Assert
      expect(mockAlbumRepository.addAlbum).toBeCalledWith(new AddAlbum({
        name: useCasePayload.name,
        year: useCasePayload.year,
      }));
      expect(addedAlbum).toStrictEqual(expectedAddedAlbum);
    });
  });
  describe('getAlbumById', () => {
    it('shoul orchestrating the getAlbumById correctly', async () => {
      // Arrange
      const useCasePayload = {
        albumId: 'album-0001',
      };
      const verifiedUseCasePayload = new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      });
      const expectedGetedAlbum = new GetedAlbum({
        id: useCasePayload.albumId,
        name: 'album-test',
        year: 1234,
      });
      const mockAlbumRepository = new AlbumRepository();
      /** mocking needed function */
      mockAlbumRepository.checkAvailableAlbumId = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockAlbumRepository.getAlbumById = jest.fn()
        .mockImplementation(() => Promise.resolve(new GetedAlbum({
          id: useCasePayload.albumId,
          name: expectedGetedAlbum.name,
          year: expectedGetedAlbum.year,
        })));
      /** create use case instance */
      const albumUseCase = new AlbumUseCase({
        albumRepository: mockAlbumRepository,
      });
      // action
      const getedAlbum = await albumUseCase.getAlbumById(useCasePayload);
      // Assert
      expect(verifiedUseCasePayload).toHaveProperty('id');
      expect(verifiedUseCasePayload.id).toEqual(useCasePayload.albumId);
      expect(mockAlbumRepository.checkAvailableAlbumId).toBeCalledWith(new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      }));
      expect(mockAlbumRepository.getAlbumById).toBeCalledWith(new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      }));
      expect(getedAlbum).toStrictEqual(expectedGetedAlbum);
    });
  });
  describe('editAlbumById', () => {
    it('should orchestrating editAlbumByid correctly', async () => {
      // Arrange
      const useCasePayload = {
        albumId: 'album-0001',
        name: 'album-test',
        year: 1234,
      };
      const verifiedUseCaseParamsPayload = new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      });
      const mockAlbumRepository = new AlbumRepository();
      /** mocking needed function */
      mockAlbumRepository.checkAvailableAlbumId = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockAlbumRepository.editAlbumById = jest.fn()
        .mockImplementation(() => Promise.resolve());
      /** create use case instance */
      const albumUseCase = new AlbumUseCase({
        albumRepository: mockAlbumRepository,
      });
      // Action
      await albumUseCase.editAlbumByid(useCasePayload);
      // Assert
      expect(verifiedUseCaseParamsPayload).toHaveProperty('id');
      expect(verifiedUseCaseParamsPayload.id).toEqual(useCasePayload.albumId);
      expect(mockAlbumRepository.checkAvailableAlbumId).toBeCalledWith(new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      }));
      expect(mockAlbumRepository.editAlbumById).toBeCalledWith({
        ...new VerifyParamsAlbum({
          albumId: useCasePayload.albumId,
        }),
        ...new AddedAlbum({
          name: useCasePayload.name,
          year: useCasePayload.year,
        }),
      });
    });
  });
  describe('deleteAlbumById', () => {
    it('should orchestrating deleteAlbumById correctly', async () => {
      // Arrange
      const useCasePayload = {
        albumId: 'album-0001',
      };
      const verifiedUseCaseParamsPayload = new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      });
      const mockAlbumRepository = new AlbumRepository();
      /** mocking needed function */
      mockAlbumRepository.checkAvailableAlbumId = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockAlbumRepository.deleteAlbumById = jest.fn()
        .mockImplementation(() => Promise.resolve());
      /** create use case instance */
      const albumUseCase = new AlbumUseCase({
        albumRepository: mockAlbumRepository,
      });
      // Action
      await albumUseCase.deleteAlbumById(useCasePayload);
      // Assert
      expect(verifiedUseCaseParamsPayload).toHaveProperty('id');
      expect(verifiedUseCaseParamsPayload.id).toEqual(useCasePayload.albumId);
      expect(mockAlbumRepository.checkAvailableAlbumId).toBeCalledWith(new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      }));
      expect(mockAlbumRepository.deleteAlbumById).toBeCalledWith(new VerifyParamsAlbum({
        albumId: useCasePayload.albumId,
      }));
    });
  });
});
