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
  try {
    return await prisma.item.create({
      data: { name, description, amount }
    });
  } catch (error) {
    console.error('Error creating item:', error);
    throw error instanceof ApiError ? error : new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating item');
  }
};

const queryItems = async <Key extends keyof Item>(
  keys: Key[] = allItemKeys as Key[]
): Promise<Pick<Item, Key>[]> => {
  try {
    const items = await prisma.item.findMany({
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      orderBy: { id: 'desc' }
    });
    return items as Pick<Item, Key>[];
  } catch (error) {
    console.error('Error querying items:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error querying items');
  }
};

const getItemById = async <Key extends keyof Item>(
  id: number,
  keys: Key[] = allItemKeys as Key[]
): Promise<Pick<Item, Key> | null> => {
  try {
    return await prisma.item.findUnique({
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Item, Key> | null>;
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching item by ID');
  }
};

const getItemByName = async <Key extends keyof Item>(
  name: string,
  keys: Key[] = ['id', 'name', 'description', 'amount'] as Key[]
): Promise<Pick<Item, Key> | null> => {
  try {
    return await prisma.item.findFirst({
      where: { name },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Item, Key> | null>;
  } catch (error) {
    console.error('Error fetching item by name:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching item by name');
  }
};

const updateItemById = async <Key extends keyof Item>(
  itemId: number,
  updateBody: Prisma.ItemUpdateInput,
  keys: Key[] = allItemKeys as Key[]
): Promise<Pick<Item, Key> | null> => {
  try {
    const item = await getItemById(itemId);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }

    if (updateBody.isChecked !== item.isChecked) {
      return await changeIsChecked(itemId, item.isChecked) as Pick<Item, Key> | null;
    }

    if (updateBody.markAsDeleted !== item.markAsDeleted) {
      return await changeIsDeleted(itemId, item.markAsDeleted) as Pick<Item, Key> | null;
    }

    return await prisma.item.update({
      where: { id: item.id },
      data: updateBody,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Pick<Item, Key> | null;
  } catch (error) {
    console.error('Error updating item by ID:', error);
    throw error instanceof ApiError ? error : new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating item by ID');
  }
};

const deleteItemById = async (itemId: number): Promise<Item> => {
  try {
    const item = await getItemById(itemId);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    await prisma.item.delete({ where: { id: item.id } });
    return item;
  } catch (error) {
    console.error('Error deleting item by ID:', error);
    throw error instanceof ApiError ? error : new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error deleting item by ID');
  }
};

const changeIsDeleted = async (itemId: number, currentMarkAsDeleted: boolean): Promise<Item> => {
  return await prisma.item.update({
    where: { id: itemId },
    data: { markAsDeleted: !currentMarkAsDeleted },
  });
}

const changeIsChecked = async (itemId: number, currentIsChecked: boolean): Promise<Item> => {
  return await prisma.item.update({
    where: { id: itemId },
    data: { isChecked: !currentIsChecked },
  });
}

export default {
  createItem,
  queryItems,
  getItemById,
  getItemByName,
  updateItemById,
  deleteItemById
};
