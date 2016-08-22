'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/vk',
    options: {
      db: {
        safe: true
      }
    }
  },
  redis:
  {
    host: '127.0.0.1',
    port: 6379
  },
  tokenExpireTime: 60 * 60 * 24,
  seedDB: false
};
