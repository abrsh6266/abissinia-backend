// seeder/movieShowSeeder.ts
import mongoose from 'mongoose';
import MovieShow from '../models/MovieShow';
import { generateRandomShowTimes } from '../utils/generateRandomShowTimes';

const movieShowData = [
  {
    movieId: new mongoose.Types.ObjectId("665267313f65fc5b7cd328df"), // Spider-Man: Into the Spider-Verse
    hallId: new mongoose.Types.ObjectId("664fd097222a4e2bdefe7d1a"), // Abissinia Hall
  },
  {
    movieId: new mongoose.Types.ObjectId("665267313f65fc5b7cd328e1"), // Inception
    hallId: new mongoose.Types.ObjectId("664fd1a4222a4e2bdefe7d5d"), // Abissinia Hall bole
  },
  {
    movieId: new mongoose.Types.ObjectId("665267313f65fc5b7cd328e3"), // The Dark Knight
    hallId: new mongoose.Types.ObjectId("664fd1b1222a4e2bdefe7da1"), // Abissinia Hall 4 kilo
  },
  {
    movieId: new mongoose.Types.ObjectId("665267323f65fc5b7cd328e5"), // Interstellar
    hallId: new mongoose.Types.ObjectId("664fd097222a4e2bdefe7d1a"), // Abissinia Hall
  },
  {
    movieId: new mongoose.Types.ObjectId("665267323f65fc5b7cd328e7"), // The Shawshank Redemption
    hallId: new mongoose.Types.ObjectId("664fd1a4222a4e2bdefe7d5d"), // Abissinia Hall bole
  },
];

const seedMovieShows = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://Abrsh:abrsha159753@task-manager.yedy7op.mongodb.net/?retryWrites=true&w=majority&appName=Task-manager"
      );


    await MovieShow.deleteMany(); // Clear existing movie shows if needed

    for (const showData of movieShowData) {
      const newMovieShow = new MovieShow({
        ...showData,
        showTime: generateRandomShowTimes(),
        createdAt: new Date(),
      });
      await newMovieShow.save();
    }

    console.log('All movie shows have been seeded.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding movie shows:', error);
    mongoose.connection.close();
  }
};

seedMovieShows();
