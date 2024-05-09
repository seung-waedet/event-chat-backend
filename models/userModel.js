const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    first_name: {
      type: String,
      optional: true
    },
    last_name: {
        type: String,
        optional: true
      },
    email: {
      type: String,
      optional: true,
      unique: true
    },
    username: { 
      type: String, 
      unique: true, 
      required: true 
    },
    password: {
      type: String,
      required: true,
    },
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
