import { Provider } from '@nestjs/common';
import { defineDb } from 'src/infrastructure/knex';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';

export const KnexProvider: Provider = {
  provide: IDb,
  useValue: defineDb(),
};
