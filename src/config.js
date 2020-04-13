exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://api.cloudinary.com/v1_1/appex/"
    : "http://localhost:3000";
