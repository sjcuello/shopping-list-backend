import { Router } from 'express';

import itemRouter from './item.route';

const router = Router();

router.use('/item', itemRouter);

export default router;
