
export default () => ({
    port: process.env.PORT,
    jwt: {
        expireIn: process.env.JWT_EXPIRES_IN,
        secret:process.env.JWT_SECRET

    },
});
