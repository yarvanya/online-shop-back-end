const {userController} = require('../controllers');

module.exports = app => {
  app.post('/api/users', userController.create);
  app.delete('/api/user/:id', userController.destroy);
};
