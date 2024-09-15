import { Item } from '@prisma/client';
import Joi from 'joi';

const createItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string()
  })
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string()
  })
};

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      amount: Joi.number().required(),
      description: Joi.string()
    })
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.number().integer()
  })
};

export default {
  createItem,
  getItem,
  updateItem,
  deleteItem
};