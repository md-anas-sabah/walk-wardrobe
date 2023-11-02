import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectURL =
    "mongodb+srv://mdanassabah:1234567892001@cluster0.av87yda.mongodb.net/";

  mongoose
    .connect(connectURL, configOptions)
    .then(() => console.log("WalkWardrobe DB connected Successfully"))
    .catch((err) =>
      console.log(`Getting error from DB connection ${err.message}`)
    );
};

export default connectToDB;
