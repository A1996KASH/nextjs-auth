import mongoose from "mongoose";

export const dbConfig = {
  url: process.env.MONGO_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export const connectToDb = async () => {
    console.log('Connecting to DB')
  try {
    await mongoose.connect(dbConfig.url!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log('Connected to DB');
        });
    connection.on('error', (err) => {
        console.error('Error connecting to DB from line 19: ', err);
        process.exit(1);
        }
    );
  } catch (error) {
    console.error("Error connecting to DB: ", error);
  }
};