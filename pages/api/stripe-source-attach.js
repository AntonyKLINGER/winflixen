import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const { customer, source } = req.body;
            const customerSource = await stripe.customers.createSource(customer, {
               source: source
            })
            res.status(200).send(customerSource);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};