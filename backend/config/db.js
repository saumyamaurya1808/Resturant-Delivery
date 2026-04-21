//self code
// import mongoose from "mongoose";

// export const connectDB = async()=>{
//     await mongoose.connect('mongodb+srv://saaumya1808_db_user:Saumya18@cluster0.c74bfq3.mongodb.net/food-del').then(()=>console.log("DB Connected"));
// }

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("DB Connected");
//     } catch (error) {
//         console.error("DB Connection
//  Error:", error);
//         process.exit(1);
//     }
// };
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not set in .env");
    }

    const opts = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    // connect only once
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI, opts);
      console.log("DB Connected");
    } else {
      console.log("DB already connected");
    }
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGM0YjFlNDYzNDJkN2JhZjIzOGYzZCIsImlhdCI6MTc2MjQxMzM0Mn0.sJltmFCPDz6pQBh5sl9vOqa6vOlbHDbxaIZGrauhmpA ===token



//mongodb+srv://saaumya1808_db_user:Saumya18@cluster0.c74bfq3.mongodb.net/? = mongodb url