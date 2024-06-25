const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
