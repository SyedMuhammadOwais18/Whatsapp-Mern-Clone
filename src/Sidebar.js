import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
          <Avatar src=""/>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
       
      </div>
      <div className="sidebar_search">
          <div className="sidebar_searchContainer">
                <SearchIcon/>
                <input type="text" placeholder = "Search or start new chat" />
          </div>
      </div>
      <div className="sidebar_chats">
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
        
        </div>
    </div>

   
  );
}

export default Sidebar;
