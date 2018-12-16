const {userController, authController, profileController} = require('../controllers');

module.exports = app => {
  app.post('/api/users', userController.create);
  app.delete('/api/user/:id', userController.destroy);

  app.get('/api/user/activation/:token', authController.activation);
  app.post('/api/login', authController.login);

  app.get('/api/profile/:id', profileController.get);
  app.put('/api/profile/:id', profileController.update);
};
