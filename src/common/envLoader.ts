const loadEnvv = (relativePath:string = "/../../.env") => {
  if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
  } else {
    const path = __dirname + relativePath;
    console.log("dirName: " , __dirname);
    console.log("relativePath: " , relativePath);
    console.log("env Path: ", path);
    const result = require("dotenv").config({
      path,
    });

    if (result.error) {
      throw result.error;
    }  
  }
};

module.exports = loadEnvv;
