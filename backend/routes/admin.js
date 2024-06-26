import express from 'express';
import {
    getTotalUsers,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    confirmOrderFulfillment,
    getConfirmedOrders,
    getUnConfirmedOrders,
    generateSalesReport,
    getOrdersByInterval,
    getSalesSummaryByInterval
} from '../controllers/adminController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

//protects all admin routes and ensure only admin can access
//router.use(protect);
//router.use(adminOnly);

// route to get total users
// GET /api/admin/users/total
router.get('/users/total', getTotalUsers);

// route to create a product
// POST /api/admin/products/create
router.post('/products/create', createProduct);

// route to get all products
// GET /api/admin/products/getAll
router.get('/products/getAll', getAllProducts);

// route to get a product by ID
// GET /api/admin/products/get/:id
router.get('/products/get/:id', getProductById);

// route to update a product by ID
// PUT /api/admin/products/update/:id/
router.put('/products/update/:id/', updateProduct);

// route to delete a product by ID
// DELETE /api/admin/products/delete/:id
router.delete('/products/delete/:id', deleteProduct);

// route to confirm order fulfillment
// PATCH /api/admin/orders/confirm/:id
router.patch('/orders/confirm/:id', confirmOrderFulfillment);

// route to get confirmed/fulfilled orders
// GET /api/admin/orders/confirmed
router.get('/orders/confirmed', getConfirmedOrders);

// route to get confirmed/fulfilled orders
// GET /api/admin/orders/unconfirmed
router.get('/orders/unconfirmed', getUnConfirmedOrders);

// route to get weekly sales report
// GET /api/admin/sales/interval
router.get('/sales/interval', generateSalesReport);

// Route to get all orders for a specific interval
// GET /api/admin/orders/interval
router.get('/orders/interval', getOrdersByInterval);

// Route to get sales summary for a specific interval
// GET /api/admin/sales/summary
router.get('/sales/summary', getSalesSummaryByInterval);

export default router;
