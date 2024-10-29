import mongoose from "mongoose";

const Connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://utkarshsinghcbse:bt9SMyDQmbMMKMhP@mailverse.8nfuj.mongodb.net/?retryWrites=true&w=majority&appName=MailVerse"
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error connecting mongoDB with database", err.message);
  }
};

export default Connection;
