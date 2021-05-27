const {MONGODB_URI,MONGODB_DB} = process.env

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/about",
        permanent: true,
      },
    ];
  },
  env: {
    local: {
      MONGODB_URI: MONGODB_URI,
      MONGODB_DB: MONGODB_DB,
    },
  },
};
