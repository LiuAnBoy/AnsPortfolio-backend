const http = require("http");

const keepServerAlive = () => {
  setInterval(() => {
    const options = {
      host: process.env.API_URI,
      path: "/",
    };

    http
      .get(options, (res) => {
        res.on("data", (chunk) => {
          try {
            console.log(`HEROKU RESPONSE：${chunk}`);
          } catch (error) {
            console.log(error.message);
          }
        });
      })
      .on("error", (err) => {
        console.log(`Error：${err.message}`);
      });
  }, 20 * 60 * 1000);
};

module.exports = keepServerAlive;
