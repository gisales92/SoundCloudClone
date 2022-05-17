'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const playlists = await queryInterface.bulkInsert(
      "Playlists",
      [
        {
          userId: 1,
          name: "Demo-Traxx",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://res.cloudinary.com/pressplay/image/upload/v1652344411/laenuo964duz1gubfupq.png"
        },
        {
          userId: 2,
          name: "Not Your Mama's Playlist",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://res.cloudinary.com/pressplay/image/upload/v1652683232/zjyirq7ksplbipyykrit.jpg"
        },
        {
          userId: 1,
          name: "Another One",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://res.cloudinary.com/pressplay/image/upload/v1652332871/cld-sample.jpg"
        },
        {
          userId: 3,
          name: "Songs?",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://res.cloudinary.com/pressplay/image/upload/v1652332844/sample.jpg"
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
          title: "Give It To Me (REDÜKT Remix)",
          description: "Nelly Furtado never gets old",
          soundFileURL: "https://res.cloudinary.com/pressplay/video/upload/v1652690707/Give_Me_Extended_master_16_44_ohkvzz.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://i1.sndcdn.com/artworks-Kml4cJSBMFPLoRce-AyXCXg-t500x500.jpg"
        },
        {
          userId: 2,
          albumId: 2,
          title: "The Black Eyed Peas - Don't Phunk With My Heart (Stan Rave Bootleg)",
          description: "Bass House Remix of the BEP",
          soundFileURL: "https://res.cloudinary.com/pressplay/video/upload/v1652759951/The_Black_Eyed_Peas_-_Don_t_Phunk_With_My_Heart_Stan_Rave_Bootleg_MP3-320_nzobdh.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://i1.sndcdn.com/artworks-jTTNnzpO2zuygdav-vCxxyg-t500x500.jpg"
        },
        {
          userId: 3,
          albumId: 3,
          title: "Sweet Dreams (Maddmon Remix)",
          description: "As is this needed a remix",
          soundFileURL: "https://res.cloudinary.com/pressplay/video/upload/v1652760065/Sweet_Dreams_Maddmon_Remix_ghxva7.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://i1.sndcdn.com/artworks-sHzKYx22V1HbnU3d-jhAv5A-t500x500.jpg"
        },
        {
          userId: 3,
          albumId: 3,
          title: "Doja Cat - Say So (Dipzy Remix)",
          description: "Lone boy song",
          soundFileURL: "https://res.cloudinary.com/pressplay/video/upload/v1652760224/Doja_Cat_-_Need_To_Know_Dipzy_Remix_fehubd.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage: "https://i1.sndcdn.com/artworks-iuOhXOluozkyQPIz-y7khvQ-t500x500.jpg"
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
        {
          userId: 2,
          songId: 1,
          body: "Nah, it's fyah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 2,
          body: "Loud Noises...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 4,
          body: "A cat made this?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 2,
          body: "Noice",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 4,
          body: "MeWow",
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
        {
          playlistId: 2,
          songId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 3,
          songId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 3,
          songId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 3,
          songId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 4,
          songId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 4,
          songId: 4,
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
