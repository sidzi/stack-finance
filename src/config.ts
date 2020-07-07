export default {
  port: Number(process.env.PORT) || 8080,
  mongo: {
    uri: process.env.MONGODB_URI,
  },
  tick_interval: 1000, //tick time in ms
};
