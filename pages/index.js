const stripe = require("stripe")(
  "sk_test_51J5gyABtVyANtujtuLqcTomHMAq97ocrqA72UpzWe0AtvXw3lDvyV3f8g6kljnwPMkdMBZ90YXjUxUwP0ql2ix0d00x9YuUO5S"
);

module.exports.StripeIntegration = async function (dataPayment) {
  try {
    const paymentMethods = await stripe.paymentMethods.create({
      type: dataPayment.info.type,
      card: {
        number: dataPayment.info.number,
        exp_month: dataPayment.info.exp_month,
        exp_year: dataPayment.info.exp_year,
        cvc: dataPayment.info.cvc,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: dataPayment.amount,
      currency: "BRL",
      payment_method_types: ["card"],
      payment_method: paymentMethods.id,
    });

    const paymentIntentConfirmation = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      { payment_method: paymentMethods.id }
    );

    console.log(paymentIntentConfirmation);
  } catch (error) {
    console.log(error);
  }
};

this.StripeIntegration({
  amount: 20030,
  info: {
    type: "card",
    number: "4242424242424242",
    exp_month: 10,
    exp_year: 2023,
    cvc: "314",
  },
});
