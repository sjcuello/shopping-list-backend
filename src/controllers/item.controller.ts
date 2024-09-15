
import catchAsync from '../utils/catchAsync';
import { itemService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const createItem = catchAsync(async (req: Request, res: Response) => {
  const { name, amount, description } = req.body;
  const item = await itemService.createItem(name, amount, description);
  res.status(httpStatus.CREATED).send(item);
});

const getItems = catchAsync(async (_req: Request, res: Response) => {
  const result = await itemService.queryItems();
  res.send(result);
});


const getItem = catchAsync(async (req: Request, res: Response) => {
  const itemId = Number(req.params.itemId);
  const item = await itemService.getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});

const updateItem = catchAsync(async (req: Request, res: Response) => {
  const itemId = Number(req.params.itemId);
  const item = await itemService.updateItemById(itemId, req.body);
  res.send(item);
});

const deleteItem = catchAsync(async (req: Request, res: Response) => {
  const itemId = Number(req.params.itemId);
  await itemService.deleteItemById(itemId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
};