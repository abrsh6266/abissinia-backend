import mongoose from "mongoose";
import Star from "../models/Star";
import Movie from "../models/Movie";

const seedMovies = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Abrsh:abrsha159753@task-manager.yedy7op.mongodb.net/?retryWrites=true&w=majority&appName=Task-manager"
    );
    const starData = [
      {
        name: "Robert Downey Jr.",
        address: {
          email: "robert@example.com",
          phone: "123-456-7890",
          website: "https://www.robertdowneyjr.com",
        },
        profilePhoto: "https://example.com/photos/robert.jpg",
      },
      {
        name: "Chris Evans",
        address: {
          email: "chris@example.com",
          phone: "234-567-8901",
          website: "https://www.chrisevans.com",
        },
        profilePhoto: "https://example.com/photos/chris.jpg",
      },
      {
        name: "Scarlett Johansson",
        address: {
          email: "scarlett@example.com",
          phone: "345-678-9012",
          website: "https://www.scarlettjohansson.com",
        },
        profilePhoto: "https://example.com/photos/scarlett.jpg",
      },
      {
        name: "Mark Ruffalo",
        address: {
          email: "mark@example.com",
          phone: "456-789-0123",
          website: "https://www.markruffalo.com",
        },
        profilePhoto: "https://example.com/photos/mark.jpg",
      },
      {
        name: "Chris Hemsworth",
        address: {
          email: "hemsworth@example.com",
          phone: "567-890-1234",
          website: "https://www.chrishemsworth.com",
        },
        profilePhoto: "https://example.com/photos/chris-hemsworth.jpg",
      },
      {
        name: "Tom Holland",
        address: {
          email: "holland@example.com",
          phone: "678-901-2345",
          website: "https://www.tomholland.com",
        },
        profilePhoto: "https://example.com/photos/tom-holland.jpg",
      },
      {
        name: "Benedict Cumberbatch",
        address: {
          email: "benedict@example.com",
          phone: "789-012-3456",
          website: "https://www.benedictcumberbatch.com",
        },
        profilePhoto: "https://example.com/photos/benedict.jpg",
      },
      {
        name: "Chadwick Boseman",
        address: {
          email: "chadwick@example.com",
          phone: "890-123-4567",
          website: "https://www.chadwickboseman.com",
        },
        profilePhoto: "https://example.com/photos/chadwick.jpg",
      },
      {
        name: "Brie Larson",
        address: {
          email: "brie@example.com",
          phone: "901-234-5678",
          website: "https://www.brielarson.com",
        },
        profilePhoto: "https://example.com/photos/brie.jpg",
      },
      {
        name: "Paul Rudd",
        address: {
          email: "paul@example.com",
          phone: "012-345-6789",
          website: "https://www.paulrudd.com",
        },
        profilePhoto: "https://example.com/photos/paul.jpg",
      },
    ];

    Star.insertMany(starData)
      .then((stars) => {
        console.log("Stars inserted successfully");
        createMovies(stars);
      })
      .catch((error) => {
        console.error("Error inserting stars:", error);
      });

    const createMovies = (stars: any) => {
      const movieData = [
        {
          title: "Avengers: Endgame",
          duration: "3h 2m",
          genre: ["Action", "Adventure", "Drama"],
          country: "USA",
          starsId: [stars[0]._id, stars[1]._id, stars[2]._id, stars[3]._id],
          releaseDate: new Date("2019-04-26"),
          description:
            "After the devastating events of Avengers: Infinity War...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FAvengers%20Endgame.jpg?alt=media&token=1c7b79ad-ed3a-4ee4-b9d6-3f9068940a18",
          reviewId: [],
        },
        {
          title: "Spider-Man: No Way Home",
          duration: "2h 28m",
          genre: ["Action", "Adventure", "Fantasy"],
          country: "USA",
          starsId: [stars[5]._id, stars[6]._id, stars[1]._id],
          releaseDate: new Date("2021-12-17"),
          description: "Peter Parker's life is turned upside down...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FSpider-Man%20No%20Way%20Home.jpg?alt=media&token=e192acf6-5f30-417a-8ca9-1d30125d0d33",
          reviewId: [],
        },
        {
          title: "Black Panther",
          duration: "2h 14m",
          genre: ["Action", "Adventure", "Sci-Fi"],
          country: "USA",
          starsId: [stars[7]._id, stars[2]._id, stars[4]._id],
          releaseDate: new Date("2018-02-16"),
          description: "T'Challa returns home to Wakanda...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FBlack%20Panther.avif?alt=media&token=6a3abe43-ae74-4ba7-bd62-a7b9c4f0653e",
          reviewId: [],
        },
        {
          title: "Thor: Ragnarok",
          duration: "2h 10m",
          genre: ["Action", "Adventure", "Comedy"],
          country: "USA",
          starsId: [stars[4]._id, stars[3]._id, stars[6]._id],
          releaseDate: new Date("2017-11-03"),
          description:
            "Thor is imprisoned on the other side of the universe...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FThor%20Ragnarok.webp?alt=media&token=7a0a8894-2ced-4417-9b3b-c9c94e8f22c6",
          reviewId: [],
        },
        {
          title: "Doctor Strange",
          duration: "1h 55m",
          genre: ["Action", "Adventure", "Fantasy"],
          country: "USA",
          starsId: [stars[6]._id, stars[3]._id, stars[2]._id],
          releaseDate: new Date("2016-11-04"),
          description:
            "Dr. Stephen Strange's life changes after a car accident...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FDoctor%20Strange.webp?alt=media&token=5b3d37ad-5a34-41a9-aeed-dc354910c0f6",
          reviewId: [],
        },
        {
          title: "Captain Marvel",
          duration: "2h 3m",
          genre: ["Action", "Adventure", "Sci-Fi"],
          country: "USA",
          starsId: [stars[8]._id, stars[0]._id, stars[5]._id],
          releaseDate: new Date("2019-03-08"),
          description:
            "Carol Danvers becomes one of the universe's most powerful heroes...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FCaptain%20Marvel.webp?alt=media&token=10abb1a6-ce69-454d-8186-f28f13ffc81f",
          reviewId: [],
        },
        {
          title: "Ant-Man and the Wasp",
          duration: "1h 58m",
          genre: ["Action", "Adventure", "Comedy"],
          country: "USA",
          starsId: [stars[9]._id, stars[4]._id, stars[6]._id],
          releaseDate: new Date("2018-07-06"),
          description:
            "As Scott Lang balances being both a Super Hero and a father...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FAnt-Man%20and%20the%20Wasp.webp?alt=media&token=06b30da7-d2d4-41b1-b86f-4a8ae8cd7311",
          reviewId: [],
        },
        {
          title: "Guardians of the Galaxy",
          duration: "2h 1m",
          genre: ["Action", "Adventure", "Comedy"],
          country: "USA",
          starsId: [stars[0]._id, stars[1]._id, stars[2]._id],
          releaseDate: new Date("2014-08-01"),
          description:
            "A group of intergalactic criminals must pull together...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FGuardians%20of%20the%20Galaxy.webp?alt=media&token=8fce53f5-8343-40db-9688-766f25de25da",
          reviewId: [],
        },
        {
          title: "Avengers: Infinity War",
          duration: "2h 29m",
          genre: ["Action", "Adventure", "Sci-Fi"],
          country: "USA",
          starsId: [stars[0]._id, stars[1]._id, stars[2]._id, stars[3]._id],
          releaseDate: new Date("2018-04-27"),
          description:
            "The Avengers and their allies must be willing to sacrifice all...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FAvengers%20Infinity%20War.webp?alt=media&token=420ea46d-b77e-4301-8111-767ffb229966",
          reviewId: [],
        },
        {
          title: "Iron Man",
          duration: "2h 6m",
          genre: ["Action", "Adventure", "Sci-Fi"],
          country: "USA",
          starsId: [stars[0]._id, stars[3]._id, stars[5]._id],
          releaseDate: new Date("2008-05-02"),
          description: "After being held captive in an Afghan cave...",
          poster:
            "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2FIron%20Man.webp?alt=media&token=0df8385d-338c-42f9-add5-5dbce65ae670",
          reviewId: [],
        },
      ];

      Movie.insertMany(movieData)
        .then(() => {
          console.log("Movies inserted successfully");
          mongoose.connection.close();
        })
        .catch((error) => {
          console.error("Error inserting movies:", error);
          mongoose.connection.close();
        });
    };
  } catch (error) {
    console.error("Error seeding movies:", error);
    mongoose.connection.close();
  }
};

seedMovies();
