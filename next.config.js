
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
      MONGODB_URI: `mongodb+srv://recep:Hzi5wai1ISvoHU7n@ahnungcluster.ej3b7.mongodb.net/ahnung_db?retryWrites=true&w=majority`,
      MONGODB_DB: "ahnung_db",
      HOST: process.env.NODE_ENV === 'production' ? `https://ahnung.vercel.app` : `http://localhost:3000`

  },
};
