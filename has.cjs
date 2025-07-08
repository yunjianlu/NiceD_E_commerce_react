const bcrypt = require("bcryptjs");
bcrypt.hash("Aa000000.", 10).then((hash) => {
  console.log(hash);
});
