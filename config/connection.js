const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworking';
// Wrap Mongoose around local or remote connection to MongoDB
connect(connectionString);
// Export connection                                          
module.exports = connection;
