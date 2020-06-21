const router = require('express').Router(),
  authMiddleware = require('../middleware/auth'),
  {
    create,
    subscription,
    charge,
    pay
  } = require('../middleware/gerencianetApi');

router.use(authMiddleware);

console.log(`§ § § Create all route to GERENCIANET § § §`);

//create plan
router.post('/plan', async (req, res) => {
  const body = {
      name: req.body.name,
      repeats: req.body.repeats,
      interval: req.body.interval
    },
    newPlan = await create(body);
  return res.json(newPlan);
});

router.post('/plan/subscription', async (req, res) => {
  const body = {
      params: req.body.params,
      items: req.body.items,
      metadata: req.body.metadata
    },
    newSubscription = await subscription(body);
  return res.json(newSubscription);
});

router.post('/plan/subscription/pay', async (req, res) => {
  const params = req.body.params,
    bodyPay = req.body.dataPay,
    newPay = await pay(params, bodyPay);
  return res.json(newPay);
});

router.post('/plan/charge', async (req, res) => {
  const items = req.body.items,
    newCharge = await charge(items);
  return res.json(newCharge);
});

module.exports = router;
