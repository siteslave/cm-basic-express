/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { CategoryModel } from '../models/category';

const categoryModel = new CategoryModel();

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  let db = req.db;

  try {
    let rs: any = await categoryModel.getList(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

export default router;