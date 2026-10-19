import { sidebarItems } from "../../Data/Data";
import "./Sider.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
function Sidebar() {

  const {activeItem, setActiveItem} = useState(null);
  const linkofdomain = useLocation();
  return (
    <div className="sider">
      <div className="sidebar-header">
        <h2>Care Charity</h2>
      </div>
      <div className="sidebar-list">
        {sidebarItems.map((item, index) => (
          <Link  to={item.path} key={index} className={`sidebar-item ${linkofdomain.pathname === item.path ? 'active' : ''}`} onClick={() => setActiveItem(index)}>
            <div>
              <item.icon className="sidebar-icon" />
              <span className="sidebar-text">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}

export default Sidebar;
