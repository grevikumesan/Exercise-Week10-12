import express from 'express';
import { CustomerController } from '../controllers/customer-controller'; 
import { RestaurantController } from '../controllers/restaurant-controller';
import { OrderController } from '../controllers/order-controller';

const router = express.Router();

//Customer
router.post('/customers', CustomerController.create);
router.get('/customers', CustomerController.getAll);

//Restaurant
router.post('/restaurants', RestaurantController.create);
router.get('/restaurants', RestaurantController.getAll);
router.patch('/restaurants/:id', RestaurantController.update); 
router.delete('/restaurants/:id', RestaurantController.delete);

//Order
router.post('/orders', OrderController.create);
router.get('/orders', OrderController.getAll);

export default router;