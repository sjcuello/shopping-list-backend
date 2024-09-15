
import { itemService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createItem = async (req: Request, res: Response) => {
  const { name, amount, description } = req.body;
  const item = await itemService.createItem(name, amount, description);
  res.status(httpStatus.CREATED).send(item);
};

const getItems = async (_req: Request, res: Response) => {
  const result = await itemService.queryItems();
  res.send(result);
};


const updateItem = async (req: Request, res: Response) => {
  const itemId = Number(req.params.itemId);
  const item = await itemService.updateItemById(itemId, req.body);
  res.send(item);
};

const deleteItem = async (req: Request, res: Response) => {
  const itemId = Number(req.params.itemId);
  await itemService.deleteItemById(itemId);
  res.status(httpStatus.NO_CONTENT).send();
};

export default {
  createItem,
  getItems,
  updateItem,
  deleteItem
};