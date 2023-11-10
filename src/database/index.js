import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://mdanassabah:1234567892001@cluster0.av87yda.mongodb.net/";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Walk Wardrobe database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
