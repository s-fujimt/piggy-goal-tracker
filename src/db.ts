import Dexie, { Table } from "dexie";
import { GoalStep } from "./model";

export type DexieDatabase = { [P in keyof Dexie]: Dexie[P] };

export interface GoalStepDB extends DexieDatabase {
  settings: Table<{ key: string; value: string }, string>;
  steps: Table<GoalStep, number>;
}

export class PiggyGoalDatabase extends Dexie {
  constructor() {
    super("piggy-goals");
    this.version(1).stores({
      settings: "key",
      steps: "++id",
    });
  }
}

export const db = new PiggyGoalDatabase() as GoalStepDB;
