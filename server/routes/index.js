const {userController, authController} = require('../controllers');

module.exports = app => {
  app.post('/api/users', userController.create);
  app.delete('/api/user/:id', userController.destroy);

  app.get('/api/user/activation/:token', authController.activation);
};
