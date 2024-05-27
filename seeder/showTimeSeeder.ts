import mongoose, { Types } from 'mongoose';
import MovieShow, { IMovieShow } from '../models/MovieShow';
import Movie, { IMovie } from '../models/Movie';
import Hall, { IHall } from '../models/Hall';


const showTimeData = [
    {
      day: 'Monday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    },
    {
      day: 'Tuesday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    },
    {
      day: 'Wednesday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    },
    {
      day: 'Thursday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    },
    {
      day: 'Friday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    },
    {
      day: 'Saturday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    },
    {
      day: 'Sunday',
      time: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    }
  ];
  
  const movieIds = [
    '6654af9de89445f37ace70a2',
    '6654af9de89445f37ace70a3',
    '6654af9de89445f37ace70a4',
    '6654af9de89445f37ace70a5',
    '6654af9de89445f37ace70a6',
    '6654b1489fac861aa0813d53'
  ].map(id => new Types.ObjectId(id));

const createMovieShows = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://Abrsh:abrsha159753@task-manager.yedy7op.mongodb.net/?retryWrites=true&w=majority&appName=Task-manager"
      );
      const movies = await Movie.find({ _id: { $in: movieIds } });
      const halls = await Hall.find();
  
      if (halls.length === 0) {
        console.error('No halls found. Please add hall data first.');
        return;
      }
  
      const movieShowData = movies.map((movie, index) => ({
        createdAt: new Date(),
        showTime: showTimeData,
        movieId: movie._id as mongoose.Types.ObjectId,
        hallId: halls[index % halls.length]._id as mongoose.Types.ObjectId,
      }));
  
      await MovieShow.insertMany(movieShowData);
      console.log('Movie shows inserted successfully');
    } catch (error) {
      console.error('Error inserting movie shows:', error);
    } finally {
      await mongoose.disconnect();
    }
  };
  
  createMovieShows();
