import React from 'react';
import "./message.css"
import { format } from "timeago.js"
export default function Message({ own, message }) {
    return <div className={own ? "message own" : "message"}>

        <div className="messageItems">
            <img src="/assets/2.jpg" alt="" className='messageImg' />
            <div className='messageText'> {message.text}</div>
        </div>
        <span className='messageTime'>{format(message.createdAt)}</span>
    </div>

}
