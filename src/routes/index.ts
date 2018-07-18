import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'ยินดีต้อนรับสู่ API Server', code: HttpStatus.OK });
});

router.get('/hello/:name/:age', (req: Request, res: Response) => {
  // http://localhost:8080/hello/Express
  // http://localhost:8080/hello/Express/78

  let name = req.params.name;
  let age = req.params.age;

  res.send({ myname: name, age: age });
});

router.get('/hello', (req: Request, res: Response) => {
  // http://localhost:8080/hello?name=xxxx&age=20
  let name = req.query.name;
  let age = req.query.age;

  res.send({ name: name, age: age });
});

router.post('/hello', (req: Request, res: Response) => {
  let name = req.body.name;
  let age = req.body.age;

  res.send({ method: 'POST', name: name, age: age });
});

router.put('/hello', (req: Request, res: Response) => {
  let name = req.body.name;
  let age = req.body.age;

  res.send({ method: 'PUT', name: name, age: age });
});

router.delete('/hello', (req: Request, res: Response) => {
  let name = req.body.name;
  let age = req.body.age;

  res.send({ method: 'DELETE', name: name, age: age });
});

export default router;