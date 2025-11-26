import { Link } from "react-router-dom";
import headerLogo from "../../images/header-images/header-logo.svg";
import phoneIcon from "../../images/header-images/phone-icon.svg";

const Header = () => {
  return (
    <header>
      <div className="mycon flex flex-wrap gap-3 items-center justify-between py-3">
        <Link to={"/"}>
          <img
            className="mycon w-[100px] h-10"
            src={headerLogo}
            alt="Car rental"
          />
        </Link>
        <nav className="header-links flex  items-center gap-3 md:gap-4 lg:gap-5">
          <Link to={"/"}>Home</Link>
          <Link to={"#"}>Vehicles</Link>
          <Link to={"#"}>Detail</Link>
          <Link to={"#"}>About us</Link>
          <Link to={"#"}>Contact us</Link>
        </nav>

        <div className="flex items-center gap-2">
          <img src={phoneIcon} alt="Phone icon" />
          <a className="flex flex-col" href="tel:+9962471680">
            <span> Need help?</span>
            <span>+996 247-1680</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
