import * as Knex from 'knex';

export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('requests')
      .insert(data);
  }

  getList(db: Knex, customerId: any) {
    return db('requests as r')
      .select('r.*', 'rc.request_category_name')
      .where('r.customer_id', customerId)
      .leftJoin('request_categories as rc', 'rc.request_category_id', 'r.request_category_id')
      .orderBy('r.request_date');
  }

}