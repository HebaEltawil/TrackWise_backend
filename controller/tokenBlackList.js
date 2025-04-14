// // utils/tokenBlacklist.js
// const blacklist = new Map();

// const blacklistToken = (token, exp) => {
//   const expiresAt = exp * 1000; // convert to milliseconds
//   blacklist.set(token, expiresAt);

//   // Auto-remove after expiration
//   setTimeout(() => blacklist.delete(token), expiresAt - Date.now());
// };

// const isTokenBlacklisted = (token) => {
//   return blacklist.has(token);
// };

// module.exports = { blacklistToken, isTokenBlacklisted };
