// movieData.ts
import mongoose from 'mongoose';

export const movies = [
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie1.jpeg?alt=media&token=cc84f063-4585-4f94-a297-4b7244067212",
    title: "Spider-Man: Into the Spider-Verse",
    genre: ["Animation", "Action", "Adventure"],
    starsId: [
      new mongoose.Types.ObjectId("665260356d9478fc390af8f1"), // Shameik Moore
      new mongoose.Types.ObjectId("665260356d9478fc390af8f3"), // Jake Johnson
      new mongoose.Types.ObjectId("665260356d9478fc390af8f5"), // Hailee Steinfeld
    ],
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    releaseDate: new Date('2018-12-14'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie2.jpg?alt=media&token=bdfdd286-45c4-4c5e-8e2a-dae2885dc297",
    title: "Inception",
    genre: ["Action", "Adventure", "Sci-Fi"],
    starsId: [
      new mongoose.Types.ObjectId("665260356d9478fc390af8f7"), // Leonardo DiCaprio
      new mongoose.Types.ObjectId("665260366d9478fc390af8f9"), // Joseph Gordon-Levitt
      new mongoose.Types.ObjectId("665260366d9478fc390af8fb"), // Ellen Page
    ],
    description: "A thief who enters the dreams of others to steal secrets from their subconscious.",
    releaseDate: new Date('2010-07-16'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie3.jpg?alt=media&token=71fd34ec-3d5a-4efe-9279-3a3515c458ff",
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    starsId: [
      new mongoose.Types.ObjectId("665260366d9478fc390af8fd"), // Christian Bale
      new mongoose.Types.ObjectId("665260366d9478fc390af8ff"), // Heath Ledger
      new mongoose.Types.ObjectId("665260366d9478fc390af901"), // Aaron Eckhart
    ],
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: new Date('2008-07-18'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie4.jpg?alt=media&token=ec8b29b6-6fbd-42e0-99e2-b9179b44c385",
    title: "Interstellar",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    starsId: [
      new mongoose.Types.ObjectId("665260376d9478fc390af903"), // Matthew McConaughey
      new mongoose.Types.ObjectId("665260376d9478fc390af905"), // Anne Hathaway
      new mongoose.Types.ObjectId("665260376d9478fc390af907"), // Jessica Chastain
    ],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: new Date('2014-11-07'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie5.jpg?alt=media&token=cc47be8d-a3ce-436d-bfbb-81fc9874893d",
    title: "The Shawshank Redemption",
    genre: ["Drama"],
    starsId: [
      new mongoose.Types.ObjectId("665260376d9478fc390af909"), // Tim Robbins
      new mongoose.Types.ObjectId("665260376d9478fc390af90b"), // Morgan Freeman
      new mongoose.Types.ObjectId("665260376d9478fc390af90d"), // Bob Gunton
    ],
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: new Date('1994-09-23'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie6.jpg?alt=media&token=944778bb-d6aa-4e27-a1ee-d428042ea6a2",
    title: "The Godfather",
    genre: ["Crime", "Drama"],
    starsId: [
      new mongoose.Types.ObjectId("665260386d9478fc390af90f"), // Marlon Brando
      new mongoose.Types.ObjectId("665260386d9478fc390af911"), // Al Pacino
      new mongoose.Types.ObjectId("665260386d9478fc390af913"), // James Caan
    ],
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: new Date('1972-03-24'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie7.jpg?alt=media&token=b991a029-13ac-41cc-8b0d-293a93a27101",
    title: "Pulp Fiction",
    genre: ["Crime", "Drama"],
    starsId: [
      new mongoose.Types.ObjectId("665260386d9478fc390af915"), // John Travolta
      new mongoose.Types.ObjectId("665260386d9478fc390af917"), // Uma Thurman
      new mongoose.Types.ObjectId("665260386d9478fc390af919"), // Samuel L. Jackson
    ],
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: new Date('1994-10-14'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie8.jpg?alt=media&token=a46cf0be-9539-4432-8f25-b633141d5ead",
    title: "The Matrix",
    genre: ["Action", "Sci-Fi"],
    starsId: [
      new mongoose.Types.ObjectId("665260386d9478fc390af91b"), // Keanu Reeves
      new mongoose.Types.ObjectId("665260386d9478fc390af91d"), // Laurence Fishburne
      new mongoose.Types.ObjectId("665260386d9478fc390af91f"), // Carrie-Anne Moss
    ],
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseDate: new Date('1999-03-31'),
    country: "USA",
  },
  {
    poster: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fmovie10.jpg?alt=media&token=0fa9c654-bf17-4920-8325-08f936c32148",
    title: "The Lord of the Rings: The Return of the King",
    genre: ["Action", "Adventure", "Drama"],
    starsId: [
      new mongoose.Types.ObjectId("665260386d9478fc390af921"), // Elijah Wood
      new mongoose.Types.ObjectId("665260386d9478fc390af923"), // Viggo Mortensen
      new mongoose.Types.ObjectId("665260386d9478fc390af925"), // Ian McKellen
    ],
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    releaseDate: new Date('2003-12-17'),
    country: "New Zealand",
  }
];
