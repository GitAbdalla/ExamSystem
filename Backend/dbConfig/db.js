const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI);
    console.log(
      `Database Connected Successfully : ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Database not connected : ${error}`);
  }
};

module.exports = dbConnection;
