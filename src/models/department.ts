import * as Knex from 'knex';

export class DepartmentModel {
  getList(db: Knex) {
    return db('departments').orderBy('department_name', 'DESC');
  }

  save(db: Knex, data: any) {
    return db('departments').insert(data);
  }

  update(db: Knex, departmentId: any, departmentName: any) {
    return db('departments')
      .where('department_id', departmentId)
      .update({ department_name: departmentName });
  }

  delete(db: Knex, departmentId: any) {
    return db('departments')
      .where('department_id', departmentId)
      .del();
  }

}