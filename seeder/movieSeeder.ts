// seeder/movieSeeder.ts
import mongoose from 'mongoose';
import Movie from '../models/Movie';
import { movies } from './movieData';

const seedMovies = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://Abrsh:abrsha159753@task-manager.yedy7op.mongodb.net/?retryWrites=true&w=majority&appName=Task-manager"
      );

    await Movie.deleteMany(); // Clear existing movies if needed

    for (const movieData of movies) {
      const newMovie = new Movie(movieData);
      await newMovie.save();
    }

    console.log('All movies have been seeded.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding movies:', error);
    mongoose.connection.close();
  }
};

seedMovies();
