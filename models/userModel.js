const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    displayName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      optional: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    displayImage: {
      type: String,
      optional: true,
    },
    bio: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true
    }
  });

// before save
userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
})

userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}




module.exports = mongoose.model('User', userSchema);
