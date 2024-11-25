// Import required modules and initialize the router
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

// Define the POST route to create a Stripe Checkout session
router.post('/', async (req, res) => {
  try {
    // Create a Stripe Checkout session with hardcoded product details
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Specify allowed payment methods
      mode: 'payment', // Specify mode as one-time payment
      line_items: [ // Define products to be included in the session
        {
          price_data: {
            currency: 'usd', // Set currency to USD
            product_data: { name: 'Sample Product A' }, // Product name
            unit_amount: 1500, // Price in cents
          },
          quantity: 1, // Quantity of the product
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Sample Product B' },
            unit_amount: 2500,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`, // Redirect URL for successful payment
      cancel_url: `${req.headers.origin}/`, // Redirect URL for canceled payment
    });

    // Redirect the client to the session URL
    res.redirect(session.url);
  } catch (error) {
    console.error('Error creating session:', error); // Log errors for debugging
    res.status(500).json({ error: 'Failed to create session' }); // Send error response to client
  }
});

// Export the router for use in the application
module.exports = router;
