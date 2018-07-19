import * as Knex from 'knex';

export class CategoryModel {
  getList(db: Knex) {
    return db('request_categories');
  }
}