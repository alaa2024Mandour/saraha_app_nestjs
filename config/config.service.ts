const config  = () => ({
    PORT: parseInt(process.env.PORT || "3000", 10),
    DB_URL: process.env.DB_URI,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    IV_LENGTH: parseInt(process.env.IV_LENGTH || "16", 10),
});

export default config;