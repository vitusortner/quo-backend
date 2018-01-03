module.exports = {
    // Secret key for JWT signing and encryption
    'secret': '-lfkgnl-nrkwnnlnqlnjfdsjfxmcfsmicvwoc,rwp123lb chvgvh4568fdssdoco33okd njaj',
    // Database connection information
    'database': 'mongodb://localhost:27017/quo',
    // AWS picture bucket URL
    'pictureBucket': 'https://s3.eu-central-1.amazonaws.com/quo-picture-bucket/',
    // Setting port for server
    'port': process.env.PORT || 3000
}