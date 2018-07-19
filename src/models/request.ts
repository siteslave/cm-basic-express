import * as Knex from 'knex';

export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('requests')
      .insert(data);
  }

  getList(db: Knex, customerId: any, limit: number, offset: number) {
    return db('requests as r')
      .select('r.*', 'rc.request_category_name')
      .where('r.customer_id', customerId)
      .leftJoin('request_categories as rc', 'rc.request_category_id', 'r.request_category_id')
      .limit(limit)
      .offset(offset)
      .orderBy('r.request_date');
  }

  getTotal(db: Knex, customerId: any) {
    return db('requests').where('customer_id', customerId)
      .select(db.raw('count(*) as total'));
  }

}