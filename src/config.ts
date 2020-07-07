export default {
  port: Number(process.env.PORT) || 8080,
  mongo: {
    uri: process.env.MONGODB_URI,
  },
};
