import mongoose from "mongoose"
const mongoURI = process.env.MONGODB_URI;
export const connectdb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};
 

