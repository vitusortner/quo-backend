module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'We have to decide on one', //TODO Set secret passphrase.
    // Database connection information
    'database': 'mongodb://localhost:27017/quo',
    // Setting port for server
    'port': process.env.PORT || 3000
}