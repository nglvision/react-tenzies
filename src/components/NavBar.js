import React from "react";
function NavBar(props) {
  return (
    <nav className={props.darkMode ? "dark" : ""}>
      <h3 className="nav--logo_text">주사위 게임</h3>

      <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider" onClick={props.toggleDarkMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
    </nav>
  );
}

export default NavBar;
