import React from "react";
import { Link } from "gatsby";

const MainMenu = ({ menu = MENU }) => {
  return (
    <ul>
      {menu.map(({ path, label }) => (
        <li>
          <Link to={path}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MainMenu;

const MENU = [{ label: "Home", path: "/" }];
