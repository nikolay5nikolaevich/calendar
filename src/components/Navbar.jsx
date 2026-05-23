import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Navbar() {
  const t = useClock();
  const hh = String(t.getHours()).padStart(2, "0");
  const mm = String(t.getMinutes()).padStart(2, "0");

  return (
    <nav className="navbar">
      <div className="navbar_brand">
        <svg className="navbar_logo_icon" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="9" height="9" fill="currentColor" />
          <rect x="12" y="1" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="12" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
          <rect x="12" y="12" width="9" height="9" fill="currentColor" />
        </svg>
        <span className="navbar_brand_name">
          habit<span className="navbar_brand_dot">·</span>grid
        </span>
        <span className="navbar_club_tag">БАКИ</span>
      </div>

      <div className="navbar_links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "nav_link" + (isActive ? " nav_link--active" : "")
          }
        >
          Трекер
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            "nav_link" + (isActive ? " nav_link--active" : "")
          }
        >
          Прогресс
        </NavLink>
      </div>

      <div className="navbar_right">
        <span className="navbar_time_wrap">
          <span className="navbar_live_dot" aria-hidden="true" />
          <span className="navbar_time">{hh}:{mm} · MSK</span>
        </span>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
