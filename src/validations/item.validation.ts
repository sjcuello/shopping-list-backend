import Joi from 'joi';

const createItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string()
  })
};

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.string().required()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      amount: Joi.number().required(),
      description: Joi.string(),
      isChecked: Joi.boolean(),
      markAsDeleted: Joi.boolean(),
      id: Joi.number(),
      createdAt: Joi.date(),
      updatedAt: Joi.date()
    })
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().required()
  })
};

export default {
  createItem,
  updateItem,
  deleteItem
};