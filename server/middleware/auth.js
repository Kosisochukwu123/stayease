const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  console.log('AUTH HEADER:', header ? 'present' : 'MISSING');
  
  const token = header?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token — please log in' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('AUTH USER:', req.user);
    next();
  } catch (e) {
    console.log('AUTH ERROR:', e.message);
    res.status(401).json({ message: 'Session expired — please log in again' });
  }
};

const adminOnly = (req, res, next) => {
  console.log('ADMIN CHECK — req.user:', req.user);
  if (!req.user?.isAdmin) {
    console.log('BLOCKED — isAdmin is:', req.user?.isAdmin);
    return res.status(403).json({ message: 'Admin access required' });
  }
  console.log('ADMIN OK');
  next();
};

module.exports = auth;
module.exports.adminOnly = adminOnly;