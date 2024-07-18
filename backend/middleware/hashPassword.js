const bcrypt = require("bcrypt");

const Hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePass = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = { comparePass, Hash };
