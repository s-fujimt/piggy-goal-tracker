import Pig from "../Icons/Pig";

interface HeaderProps {
  openSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSettings }) => {
  return (
    <header>
      <div className="header-left">
        <span className="h-8 w-8 mr-2 fill-primary bg-light p-1 rounded-lg">
          <Pig />
        </span>
        PiggyGoals
      </div>
      <div onClick={openSettings} className="header-settings">
        Settings
      </div>
    </header>
  );
};

export default Header;
