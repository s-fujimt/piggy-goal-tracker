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
    <div className="w-full px-4">
      <div className="goal-overview-wrap">
        <div className="goal-overview-details">
          <div className="goal-overview-title">目標達成率</div>
          <div className="goal-overview-percentage">
            {calculatePercentage(calculateTotal(steps), goal)}%
          </div>
          <div className="goal-overview-absolute">
            {calculateTotal(steps)}円 / <strong>{goal}円</strong>
          </div>
        </div>

        <div
          className="goal-overview-piggy-bank"
          style={{
            background:
              "linear-gradient(to top, #ea8a8a 0%, #ea8a8a " +
              calculatePercentage(calculateTotal(steps), goal) +
              "%, #ea8a8a30 " +
              calculatePercentage(calculateTotal(steps), goal) +
              "%)",
          }}
        ></div>
      </div>

      <svg viewBox="0 0 576 512" width="0" height="0">
        <clipPath id="myClip" clipPathUnits="objectBoundingBox">
          <path
            d="M400 96l0 .7c-5.3-.4-10.6-.7-16-.7H256c-16.5 0-32.5 2.1-47.8 6c-.1-2-.2-4-.2-6c0-53 43-96 96-96s96 43 96 96zm-16 32c3.5 0 7 .1 10.4 .3c4.2 .3 8.4 .7 12.6 1.3C424.6 109.1 450.8 96 480 96h32l-18.8 75.1c15.8 14.8 28.7 32.8 37.5 52.9H544c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H512c-9.1 12.1-19.9 22.9-32 32v64c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H256v32c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V416c-34.9-26.2-58.7-66.3-63.2-112H68c-37.6 0-68-30.4-68-68s30.4-68 68-68h4c13.3 0 24 10.7 24 24s-10.7 24-24 24H68c-11 0-20 9-20 20s9 20 20 20H99.2c12.1-59.8 57.7-107.5 116.3-122.8c12.9-3.4 26.5-5.2 40.5-5.2H384zm64 136c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24z"
            transform="scale(0.001736111)"
          />
        </clipPath>
      </svg>
    </div>
  );
};

export default GoalOverview;
