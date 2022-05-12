module.exports = {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
    },
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    cloudinary: {
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      cloudinary_url: process.env.CLOUDINARY_URL
    }
  };