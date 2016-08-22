'use strict';

const path = require('path');
const _ = require('lodash');

// Base config
let base = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 8899,
  logType: 'dev',
  secrets: {
    session: 'virgo-secret',
    token_secret: 'virgotoken'
  },
  userRoles: { //set in user.model
    'user': 0,
    'admin': parseInt('1111', 2),
    'editor': parseInt('100', 2),
  },

  userRights: {
    'admin': parseInt('111', 2),
    'edit': parseInt('100', 2),
  },
  roleHasRight: function(role, right) {
    return this.userRights[right] ===
      (this.userRights[right] & this.userRoles[role]);
  },
};


// Overide base config with environment
module.exports = _.merge(base, require('./' + process.env.NODE_ENV + '.js') || {});
