/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { DepartmentModel } from '../models/department';
const departmentModel = new DepartmentModel();

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  let db = req.db;

  try {
    let rows = await departmentModel.getList(db);
    res.send({ ok: true, rows: rows });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  }

});
// save
router.post('/', async (req: Request, res: Response) => {
  let db = req.db;
  let departmentName = req.body.departmentName;

  try {
    let data: any = {
      department_name: departmentName
    };

    await departmentModel.save(db, data);
    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  }

});

router.put('/:departmentId', async (req: Request, res: Response) => {
  let db = req.db;
  let departmentId = req.params.departmentId;
  let departmentName = req.body.departmentName;

  try {
    await departmentModel.update(db, departmentId, departmentName);
    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  }

});

router.delete('/:departmentId', async (req: Request, res: Response) => {
  let db = req.db;
  let departmentId = req.params.departmentId;

  try {
    await departmentModel.delete(db, departmentId);
    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  }

});

export default router;