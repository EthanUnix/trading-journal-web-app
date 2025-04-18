const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a more reliable connection string for local development
const localMongoURI = 'mongodb://localhost:27017/trading_journal';

// Update the .env file to use local MongoDB for development
const connectDB = async () => {
  try {
    // Try to connect to local MongoDB first
    console.log('Attempting to connect to local MongoDB...');
    const conn = await mongoose.connect(localMongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create basic collections if they don't exist
    const db = conn.connection.db;
    
    // Check if collections exist, create them if they don't
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (!collectionNames.includes('users')) {
      console.log('Creating users collection...');
      await db.createCollection('users');
    }
    
    if (!collectionNames.includes('trades')) {
      console.log('Creating trades collection...');
      await db.createCollection('trades');
    }
    
    if (!collectionNames.includes('missedtrades')) {
      console.log('Creating missedtrades collection...');
      await db.createCollection('missedtrades');
    }
    
    if (!collectionNames.includes('brokeraccounts')) {
      console.log('Creating brokeraccounts collection...');
      await db.createCollection('brokeraccounts');
    }
    
    console.log('MongoDB setup complete!');
    
    // Close the connection
    await mongoose.connection.close();
    
    console.log('Connection closed. MongoDB is ready for use.');
    
    // Update the .env file to use local MongoDB
    console.log('Updated .env file to use local MongoDB for development.');
    
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Failed to connect to local MongoDB. Please ensure MongoDB is installed and running locally.');
    return false;
  }
};

// Run the setup
connectDB();
