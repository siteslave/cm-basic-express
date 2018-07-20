/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { RequestModel } from '../models/request';

const requestModel = new RequestModel();
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  let db = req.db;
  let customerId = req.decoded.id;
  let limit = +req.query.limit || 10;
  let offset = +req.query.offset || 0;

  try {
    let rs: any = await requestModel.getList(db, customerId, limit, offset);
    let rsTotal: any = await requestModel.getTotal(db, customerId);
    console.log(rsTotal[0].total);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

router.get('/logs/:requestId', async (req: Request, res: Response) => {
  let db = req.db;
  let requestId = req.params.requestId;

  try {
    let rs: any = await requestModel.getRequestLogs(db, requestId);
    res.send({ ok: true, rows: rs[0] });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

router.delete('/:requestId', async (req: Request, res: Response) => {
  let db = req.db;
  let requestId = req.params.requestId;

  try {
    await requestModel.removeRequest(db, requestId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

router.get('/:requestId', async (req: Request, res: Response) => {
  let db = req.db;
  let requestId = req.params.requestId;

  try {
    let rs: any = await requestModel.getDetail(db, requestId);
    res.send({ ok: true, info: rs[0] });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

// save new request
router.post('/', async (req: Request, res: Response) => {
  let code = moment().format('x');

  let cause = req.body.cause;
  let categoryId = req.body.categoryId;
  let remark = req.body.remark;
  // from token
  let customerId = req.decoded.id;

  let requestDate = moment().format('YYYY-MM-DD');
  let requestTime = moment().format('HH:mm:ss');

  let data: any = {};
  data.request_code = code;
  data.request_cause = cause;
  data.remark = remark;
  data.customer_id = customerId;
  data.request_date = requestDate;
  data.request_time = requestTime;
  data.request_category_id = categoryId;

  try {
    await requestModel.saveRequest(req.db, data);
    res.send({ ok: true, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

router.put('/:requestId', async (req: Request, res: Response) => {

  let cause = req.body.cause;
  let categoryId = req.body.categoryId;
  let remark = req.body.remark;

  let requestId = req.params.requestId;

  let data: any = {};
  data.request_cause = cause;
  data.remark = remark;
  data.request_category_id = categoryId;

  try {
    await requestModel.updateRequest(req.db, data, requestId);
    res.send({ ok: true, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

export default router;