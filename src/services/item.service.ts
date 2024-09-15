import { Prisma, Item } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../database';
import ApiError from '../utils/ApiError';

const allItemKeys: (keyof Item)[] = [
  'id',
  'name',
  'description',
  'amount',
  'isChecked',
  'markAsDeleted',
  'createdAt',
  'updatedAt'
];

const createItem = async (
  name: string,
  amount: number,
  description?: string,
): Promise<Item> => {
  if (await getItemByName(name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return prisma.item.create({
    data: {
      name,
      description,
      amount
    }
  });
};

const queryItems = async <Key extends keyof Item>(
  keys: Key[] = allItemKeys as Key[]
): Promise<Pick<Item, Key>[]> => {
  const items = await prisma.item.findMany({
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    orderBy: { id: 'desc' }
  });
  return items as Pick<Item, Key>[];
};


const getItemById = async <Key extends keyof Item>(
  id: number,
  keys: Key[] = allItemKeys as Key[]
): Promise<Pick<Item, Key> | null> => {
  return prisma.item.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Item, Key> | null>;
};

const getItemByName = async <Key extends keyof Item>(
  name: string,
  keys: Key[] = ['id', 'name', 'description', 'amount'] as Key[]
): Promise<Pick<Item, Key> | null> => {
  return prisma.item.findFirst({
    where: { name },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Item, Key> | null>;
};

const updateItemById = async <Key extends keyof Item>(
  itemId: number,
  updateBody: Prisma.ItemUpdateInput,
  keys: Key[] = allItemKeys as Key[]
): Promise<Pick<Item, Key> | null> => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  if (updateBody.name && (await getItemByName(updateBody.name as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const updatedItem = await prisma.item.update({
    where: { id: item.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedItem as Pick<Item, Key> | null;
};

const deleteItemById = async (itemId: number): Promise<Item> => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await prisma.item.delete({ where: { id: item.id } });
  return item;
};

export default {
  createItem,
  queryItems,
  getItemById,
  getItemByName,
  updateItemById,
  deleteItemById
};