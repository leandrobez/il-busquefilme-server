//load controller
const userRoute = require('../controllers/userRoute'),
  authenticateRoute = require('../controllers/authenticateRoute'),
  gerencianetRoute = require('../controllers/gerencianetRoute'),
  customerRoute = require('../controllers/customerRoute'),
  apiRouter = '/busquefilme/api/';

//server side route
module.exports = app => {
  console.log(`*¨*¨*¨¨ SERVER SIDE ROUTER LOUDER... ¨¨*¨*¨*`);
  app
    .use(`${apiRouter}user`, userRoute)
    .use(`${apiRouter}authenticate`, authenticateRoute)
    .use(`${apiRouter}customer`, customerRoute)
    .use(`${apiRouter}gerencianet`, gerencianetRoute);
};
