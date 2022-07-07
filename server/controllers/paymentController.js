const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
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

const checkout_session = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const customer = await stripe.customers.retrieve(session.customer);
    //Purchase Mail
    const arr = [];
    session.line_items.data.map((ele) => {
      return arr.push([
        ele.quantity,
        ele.description,
        ele.amount_total / ele.quantity / 100,
      ]);
    });
    console.log(arr);
    const default_subject = `Thank you for your purchase, ${customer.name}`;
    const message = `Hello ${
      customer.name
    }!! You payment was successful and is being processed. We will send it to ${
      customer.address.city
    }, ${customer.address.line1}. Your purchase was ${
      session.amount_total / 100
    }€ and contains ${arr.map((ele) => [
      `x${ele[0]} of ${ele[1]} for ${ele[2]}€ each`,
    ])}. Thank you for purchasing.`;
    const mailOptions = {
      to: `${customer.email}`,
      // bcc: process.env.DESTINATION_EMAIL,
      subject: default_subject,
      html: "<p>" + default_subject + "</p><p><pre>" + message + "</pre></p>",
    };
    await transport.sendMail(mailOptions);

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
