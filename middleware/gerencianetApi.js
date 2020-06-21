const gerencianetSDK = require('gn-api-sdk-node'),
  dotenv = require('dotenv');

dotenv.config();
let optionsSDK = {}
if (process.env.GN_SANDBOX) {
    optionsSDK = {
      client_id: process.env.GNCLIENT_ID,
      client_secret: process.env.GNCLIENT_SECRET,
      sandbox: true
    };
  } else {
    optionsSDK = {
      client_id: process.env.PROD_GNCLIENT_ID,
      client_secret: process.env.PROD_GNCLIENT_SECRET,
      sandbox: false
    };
  }

const GerenciaNet = new gerencianetSDK(optionsSDK);

const create = async body => {
  const plan = await GerenciaNet.createPlan({}, body)
    .then(res => {
      if (res.code === 200) {
        return {
          error: false,
          data: res.data
        };
      } else {
        return {
          error: true,
          message: {
            type: 'warning',
            value: 'Erro de conexão'
          }
        };
      }
    })
    .catch(err => {
      return {
        error: true,
        message: {
          type: 'warning',
          value: err.message
        }
      };
    });

  return plan;
};

const subscription = async body => {
  const params = body.params;
  const subscriptionBody = {
    items: body.items,
    metadata: body.metadata
  };
  const assign = await GerenciaNet.createSubscription(params, subscriptionBody)
    .then(res => {
      if (res.code === 200) {
        return {
          error: false,
          data: res.data
        };
      } else {
        return {
          error: true,
          message: {
            type: 'warning',
            value: 'Erro de conexão'
          }
        };
      }
    })
    .catch(err => {
      return {
        error: true,
        message: {
          type: 'warning',
          value: err.error_description
        }
      };
    });

  return assign;
};

const charge = async charge => {
  const chargeInput = await GerenciaNet.createCharge({}, charge).then(res => {
      return res;
    }).catch(err => {
      console.log(err.message);
    });
  return chargeInput;
};

const pay = async (params, pay) => {
  const paySubscription = await GerenciaNet.paySubscription(params, pay)
    .then(res => {
      if (res.code === 200) {
        return {
          error: false,
          data: res.data
        };
      } else {
        return {
          error: true,
          message: {
            type: 'warning',
            value: 'Erro de conexão'
          }
        };
      }
    })
    .catch(err => {
      return {
        error: true,
        message: {
          type: 'warning',
          value: err.error_description
        }
      };
    });
  return paySubscription;
};

module.exports = { create, subscription, charge, pay };
