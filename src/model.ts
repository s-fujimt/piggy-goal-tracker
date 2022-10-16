export interface GoalStep {
  id: number;
  name: string | undefined;
  stepValue: number;
  isDone: boolean;
  isPaid: boolean;
  date: Date;
}
