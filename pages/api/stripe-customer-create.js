import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const { email, name, payment_method, country } = req.body;
            const customerCreate = await stripe.customers.create({
                email: email,
                name: name,
                address: {
                    country: country
                }
            });

            res.status(200).send(customerCreate);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};