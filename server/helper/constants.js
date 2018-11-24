module.exports = {
    HOST: 'http://localhost:',
    PORT_BACK: '8080',
    PORT_FRONT: '4200',
    get BACKEND_URL() {
      return this.HOST + this.PORT_BACK;
    },
    get FRONTEND_URL() {
      return this.HOST + this.PORT_FRONT;
    },
    TIME: {
      ACTIVATION_TOKEN: '2d',
      LOGIN_TOKEN: '1d'
    },
    ROUTES: {
      ACTIVATION: '/api/user/activation/'
    }
  };
  