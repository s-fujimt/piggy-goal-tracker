export interface GoalStep {
  id: number;
  name: string | undefined;
  stepValue: number;
  unit: string;
  isDone: boolean;
  isPaid: boolean;
  date: Date;
}
