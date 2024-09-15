import express from 'express';
import { itemController } from '../controllers';
import { itemValidation } from '../validations';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .route('/')
  .get(itemController.getItems)
  .post(validate(itemValidation.createItem), itemController.createItem);

router
  .route('/:itemId')
  .get(validate(itemValidation.getItem), itemController.getItem)
  .delete(validate(itemValidation.deleteItem), itemController.deleteItem)
  .patch(validate(itemValidation.updateItem), itemController.updateItem);


export default router;