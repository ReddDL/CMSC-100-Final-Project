import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// create new order
export const createOrder = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { productId, quantity, email } = req.body;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product has sufficient quantity
    if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient product quantity' });
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create a new order instance
    const newOrder = new Order({
        userId: req.user._id,
        productId,
        quantity,
        status: 0,
        email,
        dateOrdered: new Date(),
        totalPrice // Set the totalPrice
    });

    // Update the product quantity and save changes
    product.quantity -= quantity;
    await product.save();
    
    // Save the new order
    await newOrder.save();

    // Send a success response
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    // Handle any errors and send a 500 (Internal Server Error) response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// // create new order
// export const createOrder = async (req, res) => {
//   try {
//       //extract necessary information from the request body
//       const { items, email } = req.body;
//       const productsList = [];

//       for (let i=0; i<items.length; i++) {
//         // destructure each item to get productId and quantity
//         const { productId, quantity } = items[i];

//         //check if the product ID is valid
//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({ message: 'Invalid product ID' });
//         }
        
//         //find the product by its ID
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         //check if the product has sufficient quantity
//         if (product.quantity < quantity) {
//             return res.status(400).json({ message: 'Insufficient product quantity' });
//         }
        
//         productsList.push({ productId, quantity });
//       }
      
//       //create a new order instance
//       const newOrder = new Order({
//           userId: req.user._id,
//           items: productsList,
//           status: 0,
//           email,
//           dateOrdered: new Date()
//       });

//       // update the product quantity and save changes
//       for (let i=0; i<items.length; i++) {
//         // destructure each item to get productId and quantity
//         const { productId, quantity } = items[i];
        
//         //find the product by its ID
//         const product = await Product.findById(productId);

//         product.quantity -= quantity;
//         await product.save();
//       }

//       // save the new order
//       await newOrder.save();

//       // send a success response
//       res.status(201).json({ message: 'Order placed successfully', order: newOrder });
//   } catch (error) {
//       // handle any errors and send a 500 (Internal Server Error) response
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

// update order status
export const updateOrderStatus = async (req, res) => {
  try {
    // extract order ID and new status from request body
    const { orderId, newStatus } = req.body;
    // find the order by ID and update its status
    const order = await Order.findByIdAndUpdate(orderId, { status: newStatus });

    // if cancelled, restore quantity to product
    if (newStatus === 2) {
      const product = await Product.findByIdAndUpdate(order.productId, { $inc: { quantity: order.quantity }});
    }

    // send a success response
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    // handle any errors and send a 500 (Internal Server Error) response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get order details by ID
export const getOrderById = async (req, res) => {
  try {
    // extract order ID from request parameters
    const orderId = req.params.id;

    // find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // send the order details as a response
    res.status(200).json({ order });
  } catch (error) {
    // handle any errors and send a 500 (Internal Server Error) response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all orders by user
export const getUserOrders = async (req, res) => {
  try {
      const orders = await Order.find({ userId: req.user._id });
      if (!orders) return res.status(404).json({ message: 'No orders found' });
      res.status(200).json(orders);
  } catch (err) {
      res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
      const orders = await Order.find({});
      if (!orders) return res.status(404).json({ message: 'No orders found' });
      res.status(200).json(orders);
  } catch (err) {
      res.status(500).json({ message: 'Server Error' });
  }
};
