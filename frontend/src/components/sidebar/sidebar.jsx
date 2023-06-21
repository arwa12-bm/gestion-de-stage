import "./sidebar.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Sidebar() {
	const token =localStorage.getItem('token')
	const user = jwt_decode(token);
	
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          
        <li className="sidebarListItem">
		<a href="#" class="brand">
			
			
		</a>
		</li>
        <li className="sidebarListItem">
				<a href="#">
				<Link to="/profile" class="text">profile </Link>
				</a>
			</li>
            <li className="sidebarListItem">
				<a href="#">
					
					<span class="text">*************</span>
				</a>
			</li>
            <li className="sidebarListItem">
				<a href="#">
					
					<span class="text">**************</span>
				</a>
			</li>
            
            <li className="sidebarListItem">
				<a href="#" class="logout">
					<Link to="/" class="text">Logout</Link>
				</a>
			</li>
		

         
         
        </ul>
      
      
      </div>
    </div>
  );
}