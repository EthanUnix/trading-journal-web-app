const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Test MongoDB connection
async function testMongoDBConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log(`Attempting to connect to: ${process.env.MONGO_URI}`);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Connection test successful!');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed.');
    
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    return false;
  }
}

// Run the test
testMongoDBConnection()
  .then(success => {
    if (success) {
      console.log('MongoDB connection test passed!');
      process.exit(0);
    } else {
      console.log('MongoDB connection test failed!');
      process.exit(1);
    }
  });
