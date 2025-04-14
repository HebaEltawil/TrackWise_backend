const BlacklistedToken = require('../model/blacklistedToken');

const logout = async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
  const token = req.token;
  if (!token) return res.status(400).json({ message: 'No token provided' });

  try {
    const expInSeconds = req.exp;
    const expiryDate = new Date(expInSeconds * 1000);

    await BlacklistedToken.create({ token, expiresAt: expiryDate });
    res.status(200).json({ message: 'Logout successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
};

module.exports = logout ;
