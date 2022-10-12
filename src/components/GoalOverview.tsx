import { GoalStep } from "../model";
import { useGoalSteps } from "../context/Context";

interface Props {
  goal: number;
}

const GoalOverview: React.FC<Props> = ({ goal }) => {
  const {
    state: { steps },
  } = useGoalSteps();

  //todo dont calculate multiple times
  const calculateTotal = (steps: GoalStep[]) => {
    return steps.reduce((acc, cur) => acc + cur.stepValue, 0);
  };
  const calculatePercentage = (total: number, goal: number) => {
    return Math.round((total / goal) * 100);
  };
  return (
    <div>
      {" "}
      <div>目標: {goal}円</div>
      <div>現在: {calculateTotal(steps)}円</div>
      <div>達成率: {calculatePercentage(calculateTotal(steps), goal)}%</div>
      {/* todo add pig */}
      {/* todo animate */}
      {/* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="100"
  height="100"
>
  <linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">
    <stop offset="0%" stopOpacity="1" stopColor="royalblue" />
    <stop
      offset={calculatePercentage(calculateTotal(steps), goal) + "%"}
      stopOpacity="1"
      stopColor="royalblue"
    />
    <stop
      offset={calculatePercentage(calculateTotal(steps), goal) + "%"}
      stopOpacity="0"
      stopColor="royalblue"
    />
    <stop offset="100%" stopOpacity="0" stopColor="royalblue" />
  </linearGradient>
  <circle
    cx="50"
    cy="50"
    r="45"
    fill="url(#lg)"
    stroke="crimson"
    stroke-width="5"
  />
</svg> */}
    </div>
  );
};

export default GoalOverview;
