import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const { method, customer } = req.body;
            const attachCard = await stripe.paymentMethods.attach(
                method,
            {customer: customer}
            );

            res.status(200).send(attachCard);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};