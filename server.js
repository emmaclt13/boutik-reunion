require("dotenv").config();

const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Render utilise SON port
const PORT = process.env.PORT || 3000;

console.log("🔥 SERVER STRIPE RUNNING 🔥");

// Middleware
app.use(express.json());

// Test serveur
app.get("/", (req, res) => {
  res.send("Backend Stripe OK ✅");
});

// Stripe checkout
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      billing_address_collection: "required",

      shipping_address_collection: {
        allowed_countries: ["FR"],
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Régulateur de gaz haute pression",
            },
            unit_amount: 5000, // 50€
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: "https://shopreunion974.netlify.app/merci.html",
      cancel_url: "https://shopreunion974.netlify.app/cancel.html",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("ERREUR STRIPE :", error);
    res.status(500).json({ error: error.message });
  }
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
