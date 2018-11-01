/*const { userController } = require('../controllers');*/

module.exports = app => {
  app.post('/api/users', console.log("POST TEST!"));
  app.delete('/api/user/:id', console.log("DELETE TEST!"));
};
