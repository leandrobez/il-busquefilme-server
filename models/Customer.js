const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 255,
      pattern: '^[ ]*(.+[ ]+)+.+[ ]*$',
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
      min: 11,
      max: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
      pattern:
        '^[A-Za-z0-9_\\-]+(?:[.][A-Za-z0-9_\\-]+)*@[A-Za-z0-9_]+(?:[-.][A-Za-z0-9_]+)*\\.[A-Za-z0-9_]+$',
    },
    phone_number: {
      type: String,
      default: '5133333333',
      max: 11,
      pattern: '^[1-9]{2}9?[0-9]{8}$',
    },
    birth: {
      type: String,
      pattern: '^[12][0-9]{3}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$',
    },
    address: {
      type: Object,
      data: {
        street: {
          type: String,
          required: true,
          default: '',
          max: 200,
        },
        number: {
          type: parseInt,
          required: true,
          default: '',
          min: 1,
          max: 5,
        },
        neighborhood: {
          type: String,
          default: '',
          max: 128,
          required: true,
        },
        zipcode: {
          type: String,
          pattern: '^[0-9]{8}$',
        },
        city: {
          type: String,
          required: true,
          default: '',
          max: 100,
        },
        complement: {
          type: String,
          default: '',
          max: 100,
        },
        state: {
          type: String,
          required: true,
          default: '',
          max: 2,
          pattern:
            '^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$',
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
