const config  = () => ({
    port: parseInt(process.env.PORT || "3000", 10),
    dbUri: process.env.DB_URI,
});

export default config;