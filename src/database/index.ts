import { PrismaClient } from '@prisma/client';
import { ENV } from '../utils/getUrl';

interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (ENV === 'development') global.prisma = prisma;

export default prisma;