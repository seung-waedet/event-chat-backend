const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    displayName: {
      type: String,
      required: True
    },
    email: {
      type: String,
      optional: True,
      unique: True
    },
    password: {
      type: String,
      required: True,
    },
    displayImage: {
      type: String,
      optional: True,
    },
    bio: {
      type: String,
      required: True
    },
    userType: {
      type: String,
      required: True
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
