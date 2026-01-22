const UserController = require('../controllers/UserController');
const { validateCustomer } = require('../helpers/auth');

module.exports = function(app) {
  app.post('/api/user/register', function(req, res) {
    console.log('HERE');
    UserController.register(req, res);
  });
  app.post('/api/user/login', function(req, res) {
    UserController.login(req, res);
  });
  app.get('/api/user/profile', validateCustomer, function(req, res) {
    UserController.getProfile(req, res);
  })
}