import express from 'express';
import { CustomerController } from '../controllers/customer-controller'; 
import { RestaurantController } from '../controllers/restaurant-controller';
import { OrderController } from '../controllers/order-controller';

export const router = express.Router();

//customer
router.post('/customers', CustomerController.create);
router.get('/customers', CustomerController.getAll);
router.get('/customers/:id', CustomerController.getById)
router.patch('/customers/:id', CustomerController.update);
router.delete('/customers/:id', CustomerController.delete)

//restaurant
router.post('/restaurants', RestaurantController.create);
router.get('/restaurants', RestaurantController.getAll);
router.patch('/restaurants/:id', RestaurantController.update); 
router.delete('/restaurants/:id', RestaurantController.delete);

//order
router.post('/orders', OrderController.create);
router.get('/orders', OrderController.getAll);
;