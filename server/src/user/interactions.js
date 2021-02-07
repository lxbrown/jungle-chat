const { getName, returnName } = require('./db/temp')();

let userMap = {};

module.exports = () => {
  const getUsername = (socket_id) => {
    return new Promise((resolve, reject) => {
      if (userMap[socket_id] == undefined) {
        userMap[socket_id] = getName();
      }
      resolve(userMap[socket_id]);
    });
  };

  //Temporary measure to put one of the anonymous usernames
  //back in the pool once the client disconnects
  const closeUsername = (socket_id) => {
    return new Promise((resolve, reject) => {
      returnName(userMap[socket_id]);
      userMap[socket_id] = undefined;
      resolve();
    })
  }

  return {
    getUsername,
    closeUsername
  };
}