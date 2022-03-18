'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const playlists = await queryInterface.bulkInsert(
      "Playlists",
      [
        {
          userId: 1,
          name: "My first playlist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "U2's playlist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const albums = await queryInterface.bulkInsert(
      "Albums",
      [
        {
          userId: 1,
          title: "Sweet tunes, vol. 1",
          description: "Now that's what I call music",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "Moar tunes, vol. 2",
          description: "Additional heaters",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: "Sampled tunes, vol. 3",
          description: "Only sampling the best of the best",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const songs = await queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 1,
          albumId: 1,
          title: "First Single",
          description: "Fun, eclectic beat",
          soundFileURL: "soundfile.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          albumId: 2,
          title: "Moar's Next Single",
          description: "Hot beatz",
          soundFileURL: "soundfile2.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          albumId: 3,
          title: "Still Single",
          description: "Lone boy song",
          soundFileURL: "soundfile3.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const comments = await queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 1,
          songId: 1,
          body: "It's okay, I guess",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 2,
          body: "Wow, so good!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 3,
          body: "Heater alert...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    return queryInterface.bulkInsert(
      "Playlist_Songs",
      [
        {
          playlistId: 1,
          songId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 1,
          songId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 2,
          songId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Playlists", null, {});
    await queryInterface.bulkDelete("Albums", null, {});
    await queryInterface.bulkDelete("Songs", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
    return queryInterface.bulkDelete("Playlist_Songs", null, {});
  },
};
