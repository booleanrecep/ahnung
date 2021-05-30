
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
      server: process.env.NODE_ENV === 'production' ? `https://ahnung.vercel.app` : `http://localhost:3000`

  },
};
