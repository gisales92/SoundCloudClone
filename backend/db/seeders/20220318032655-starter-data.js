"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const playlists = await queryInterface.bulkInsert(
      "Playlists",
      [
        {
          userId: 1,
          name: "Demo-Traxx",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660861476/audience-1853662_960_720_mnewnd.jpg",
        },
        {
          userId: 2,
          name: "Oldies But Goodies",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660861474/casette-1361688_960_720_oma9nu.jpg",
        },
        {
          userId: 3,
          name: "Music that Heals the Soul",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660861479/musician-5960112_960_720_rv1i4d.jpg",
        },
        {
          userId: 4,
          name: "Seductive Sounds",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660861463/people-3062246_960_720_t5blov.jpg",
        },
        {
          userId: 5,
          name: "Tekking's Tunes",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660862838/tekking-wanted_idxmrm.png",
        },
        {
          userId: 6,
          name: "Heaterz Only",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660861460/dragon-2407946_960_720_ogt1rj.jpg",
        },
      ],
      {}
    );

    const albums = await queryInterface.bulkInsert(
      "Albums",
      [
        {
          userId: 4,
          title: "Sweet Tunes, vol. 1",
          description: "Now that's what I call music",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660869457/album1_j4oi4s.jpg",
        },
        {
          userId: 3,
          title: "Moar Tunes, vol. 2",
          description: "Additional heaters",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660869457/album2_fnuyfa.jpg",
        },
        {
          userId: 2,
          title: "Sampled Tunes, vol. 3",
          description: "Only sampling the best of the best",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://res.cloudinary.com/duzznvxix/image/upload/v1660869459/album3_nqiwaz.jpg",
        },
      ],
      {}
    );

    const songs = await queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 2,
          albumId: 3,
          title: "Give It To Me (REDÜKT Remix)",
          description: "Nelly Furtado never gets old",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660864156/Give_Me_Extended_master_16_44_nguff9.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-Kml4cJSBMFPLoRce-AyXCXg-t500x500.jpg",
        },
        {
          userId: 2,
          albumId: 3,
          title:
            "The Black Eyed Peas - Don't Phunk With My Heart (Stan Rave Bootleg)",
          description: "Bass House Remix of the BEP",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660864166/The_Black_Eyed_Peas_-_Don_t_Phunk_With_My_Heart_Stan_Rave_Bootleg_MP3-320_wbv5ng.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-jTTNnzpO2zuygdav-vCxxyg-t500x500.jpg",
        },
        {
          userId: 2,
          albumId: 3,
          title: "Sweet Dreams (Maddmon Remix)",
          description: "As if this needed a remix",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660864161/Sweet_Dreams_Maddmon_Remix_hz2yyt.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-sHzKYx22V1HbnU3d-jhAv5A-t500x500.jpg",
        },
        {
          userId: 2,
          albumId: 3,
          title: "Doja Cat - Say So (Dipzy Remix)",
          description: "Lone boy song",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660864133/Doja_Cat_-_Need_To_Know_Dipzy_Remix_nfcgp2.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-iuOhXOluozkyQPIz-y7khvQ-t500x500.jpg",
        },
        {
          userId: 4,
          albumId: 1,
          title: "Groovetalk - Smash The House (Original Mix)",
          description: "Now available from Muzenga Records",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660864850/Groovetalk_-_Smash_The_House_Original_Mix_vzqpeh.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-DdbbVzEybNIuh3gv-jY77wQ-t500x500.png",
        },
        {
          userId: 3,
          albumId: 2,
          title: "ABBA - Voulez Vous (Josu Freire & Omar Svenson Edit)",
          description: "New twist on an old classic",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660865768/ABBA-Voulez_Vous_Josu_Freire_Omar_Svenson_Edit_MASTER_mikj9y.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-LYqnPMftQGZKyezP-nAwYnw-t500x500.jpg",
        },
        {
          userId: 3,
          albumId: 2,
          title: "Emolw - Just Go On",
          description: "Now available from Blanc Records",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660865962/Emolw_-_Just_Go_On_Extended_Mix_yzojdk.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-SyjppFjIzApUhA1a-YYbRBA-t500x500.jpg",
        },
        {
          userId: 4,
          albumId: 1,
          title: "Disclosure Ft RAYE - Waterfall (Kid Caird Remix)",
          description:
            "It's been a hot minute since I've put out a free download so I present to you all my Disclosure Ft RAYE - Waterfall (Kid Caird Remix)!!!",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660866194/Disclosure_ft_RAYE_-_Waterfall_Kid_Caird_Extended_Remix_xl58sj.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-AUsMxxCX2W4jvq6c-j5sVHQ-t500x500.jpg",
        },
        {
          userId: 3,
          albumId: 2,
          title: "Rihanna - Pon De Replay (Vipraz Bootleg Extended)",
          description: "Turn the music up!",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660866444/Rihanna_-_Pon_De_Replay_Vipraz_Bootleg_Extended_fiwfqr.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-RuPi82tYglwyQwpp-hp0Hiw-t500x500.jpg",
        },
        {
          userId: 4,
          albumId: 1,
          title: "Sergio Mendes - Mas Que Nada (ALVES & Fourth Co. Edit)",
          description: "Now available from House Hats Records",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660867626/Mas_Que_Nada_-_ALVES_Fourth_Co._MASTER_4_kllpsy.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-dZFIEUBwkamoxGJB-N8emHw-t500x500.jpg",
        },
        {
          userId: 4,
          albumId: 1,
          title: "Beyonce - Naughty Girl (Simon Erar Edit)",
          description: "Master: Rare Productions",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660867827/Beyonce_-_Naughty_Girl_Simon_Erar_Edit_g0gaet.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-YDrFiCoFz6CM1fSO-AR5czA-t500x500.jpg",
        },
        {
          userId: 3,
          albumId: 2,
          title: "Josh Hunter - Ready Or Not (Extended Mix)",
          description: "My edit of The Fugees - Ready Or Not!",
          soundFileURL:
            "https://res.cloudinary.com/duzznvxix/video/upload/v1660866444/Rihanna_-_Pon_De_Replay_Vipraz_Bootleg_Extended_fiwfqr.wav",
          createdAt: new Date(),
          updatedAt: new Date(),
          previewImage:
            "https://i1.sndcdn.com/artworks-lockfNSHwieKCYsc-kCxCzA-t500x500.jpg",
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
          body: "I like the original better",
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
          songId: 3,
          body: "Sweet remix",
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
        {
          userId: 1,
          songId: 5,
          body: "Fire track",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 6,
          body: "This is a classic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 7,
          body: "The original is by Riton ft. Kah-Lo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 8,
          body: "Enjoying this!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 9,
          body: "Wow, so good!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 10,
          body: "I love it! Download would be great :)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 11,
          body: "Heater alert...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 12,
          body: "Loud Noises...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 1,
          body: "this is actually fire",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 2,
          body: "Club banger, this go hard",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 3,
          body: "love this one",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          songId: 4,
          body: "A cat made this?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          songId: 5,
          body: "sick tune",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          songId: 6,
          body: "cool version",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          songId: 7,
          body: "yes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          songId: 8,
          body: "wowoweewa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 9,
          body: "Dope track!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 10,
          body: "feelsgoodman",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 11,
          body: "Oo tricky!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 12,
          body: "OOOOF!!! Savage tunnage!!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 1,
          body: "TOPS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 2,
          body: "Ayee!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 3,
          body: "juicy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 4,
          body: "good balance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 5,
          body: "taking me on a journey...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 6,
          body: "sheeeesh",
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
