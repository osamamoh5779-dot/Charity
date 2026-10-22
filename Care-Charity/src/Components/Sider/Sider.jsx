import { sidebarItems } from "../../Data/Data";
import "./Sider.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  // eslint-disable-next-line no-unused-vars
  const { activeItem, setActiveItem } = useState(null);

  return (
    <div className="sider">
      <div className="sidebar-header">
        <h2>Care Charity</h2>
      </div>
      <div className="sidebar-list">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <item.icon className="sidebar-icon" />
            <span className="sidebar-text">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
