const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const create_checkout_session = async (req, res) => {
  try {
    const { products } = req.body;
    if (products.length < 1 || !products)
      return res.send({
        ok: false,
        message: "Please select at least 1 product",
      });
    products.forEach((item) => {
      item.currency = process.env.CURRENCY;
      item.amount *= 100;
    });
    session = await stripe.checkout.sessions.create({
      payment_method_types: process.env.PAYMENT_METHODS.split(", "),
      line_items: products,
      success_url: `${process.env.DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/`,
    });
    return res.send({ ok: true, sessionId: session.id });
  } catch (error) {
    console.log("ERROR =====>", error.raw.message);
    return res.send({ ok: false, message: error.raw.message });
  }
};

// 14. Controller triggers by the incoming req with session id
const checkout_session = async (req, res) => {
  try {
    const { sessionId } = req.query;
    // 15. We execute request to Stripe to get data for the specific session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    // 16. From the session received above we get customer info
    const customer = await stripe.customers.retrieve(session.customer);
    // 17. And sending both session and customer to the client
    return res.send({ ok: true, session, customer });
  } catch (error) {
    console.log("ERROR =====>", error);
    return res.send({ ok: false, message: error });
  }
};

module.exports = {
  create_checkout_session,
  checkout_session,
};
