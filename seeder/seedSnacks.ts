import mongoose from 'mongoose';
import Snack, { ISnack } from '../models/Snack'; // Adjust the path as necessary

// Snack and drink data
const snackAndDrinkData = [
  {
    name: "Popcorn",
    type: "Snack",
    price: 50,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fpopcorn2.png?alt=media&token=93aea18e-a0a5-460a-85e1-9fb8751cf24b",
  },
  {
    name: "Burger",
    type: "Snack",
    price: 8,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fcheeseburger.jpg?alt=media&token=b2621581-11ef-464f-8cca-14fa553bc251",
  },
  {
    name: "Pizza",
    type: "Snack",
    price: 10,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fpizza.jpg?alt=media&token=c5ab2f89-d8d7-42e2-9407-d60017192b74",
  },
  {
    name: "Soda",
    type: "Drink",
    price: 3,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fsoft-drinks.jpg?alt=media&token=00cb2efb-6fd9-4846-a617-c5ddaf92bef5",
  },
  {
    name: "Water",
    type: "Drink",
    price: 2,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fbottled-water.jpg?alt=media&token=4b06b1a6-1e25-4230-b3f9-b5071c3da36b",
  },
  {
    name: "Fries",
    type: "Snack",
    price: 4,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Ffries.jpg?alt=media&token=79758ae8-8153-42a5-afe9-3dc2bad9704f",
  },
  {
    name: "kolo",
    type: "Snack",
    price: 50,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fkolo.png?alt=media&token=6b153ee7-aff4-436d-86f1-5639725062ad",
  },
  {
    name: "chips",
    type: "Snack",
    price: 70,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fchips.png?alt=media&token=5bfc1be4-e75f-44da-b070-7295c6fa2ed4",
  },
  {
    name: "popcorn2",
    type: "Snack",
    price: 100,
    image: "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Fpopcorn.jpg?alt=media&token=0a1fff9c-3023-4601-bce6-05035c7a59b4",
  },
];

// MongoDB connection URL
const mongoURI = 'your_mongo_connection_string_here'; // Replace with your MongoDB connection string

const seedSnacks = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://Abrsh:abrsha159753@task-manager.yedy7op.mongodb.net/?retryWrites=true&w=majority&appName=Task-manager"
      );

    // Clear existing data
    await Snack.deleteMany({});

    // Insert new data
    await Snack.insertMany(snackAndDrinkData);

    console.log('Snack and drink data seeded successfully.');
  } catch (error) {
    console.error('Error seeding snack and drink data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedSnacks();
