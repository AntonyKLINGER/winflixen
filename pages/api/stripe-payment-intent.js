import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const { amount, description } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "eur",
                description: description
            });

            res.status(200).send(paymentIntent.client_secret);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};