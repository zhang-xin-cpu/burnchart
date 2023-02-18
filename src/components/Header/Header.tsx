import React from "react";
import Link from "../Link/Link";
import Icon from "../Icon/Icon";
import Auth from "../Auth/Auth";
import "./header.less";

function Header() {
  return (
    <div id="header">
      <div className="links">
        <Link routeName="repos" className="logo">
          <Icon name="fire" />
        </Link>
        <Link routeName="addRepo" className="item">
          <Icon name="plus" /> Add a Repo
        </Link>
      </div>
      <Auth />
    </div>
  );
}

export default Header;
