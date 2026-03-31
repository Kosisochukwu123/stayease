require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const EMAIL = process.argv[2];

if (!EMAIL) {
  console.error('Usage: node makeAdmin.js your@email.com');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email: EMAIL });

  if (!user) {
    console.error(`No user found with email: ${EMAIL}`);
    process.exit(1);
  }

  user.isAdmin = true;
  await user.save();

  console.log(`✓ ${user.name} (${user.email}) is now an admin.`);
  process.exit();
}).catch(err => {
  console.error('DB error:', err.message);
  process.exit(1);
});