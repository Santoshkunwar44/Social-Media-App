import {Bookmark, Event, Group, HelpOutline, Message, PlayCircleFilledOutlined, RssFeed, School, WorkOutline} from "@material-ui/icons"
import "./sidebar.css";
import { users } from "../../dummydata";
import Friends from "../Friends/Friends";
export default function Sidebar() {
    return (
        <div className='sidebar'>
        <div className="sidebarWrapper">
           <ul className="sidebarList">
               <li className="sidebarListItem">
                        <RssFeed className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Feed</span>
               </li>
               <li className="sidebarListItem">
                        <Message className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Chat</span>
               </li>
               <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Videos</span>
               </li>
               <li className="sidebarListItem">
                        <Group className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Groups</span>
               </li>
               <li className="sidebarListItem">
                        <Bookmark className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
               </li>
               <li className="sidebarListItem">
                        <HelpOutline className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Questions</span>
               </li>
               <li className="sidebarListItem">
                        <WorkOutline className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
               </li>
               <li className="sidebarListItem">
                        <Event className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Events</span>
               </li>
               <li className="sidebarListItem">
                        <School className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Courses</span>
               </li>
              
           </ul>
           <button className="showMoreBtn">Show More</button>
           <hr className="sidebarhr"/>
                <ul className="sidebarFriendList">

                    {
                        users.map((user,index)=>(
                        <Friends key={index} user={user}/>
                        ))
                    }
                
              

                </ul>
        </div>
        </div>
    )
}
