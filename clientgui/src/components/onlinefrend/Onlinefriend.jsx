import React, { useEffect, useState } from 'react';
import axiosCall from '../../axios';
import "./onlinefriend.css"
export default function Onlinefriend({ currentUser, onlinefriend, setCurrentChat }) {

  const [onlines, setOnlineFriend] = useState([]);

  // const [allFriends, setAllFriends] = useState([])
  // const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    let newArr = [];
    try {
      const fetchFriendInfo = async () => {

        const res = await axiosCall.get("/users?userId=" + onlinefriend);
        let isArr = Array.isArray(res.data);
        if (!isArr) {
          newArr.push(res.data)
          setOnlineFriend(newArr)
        }
        setOnlineFriend(res.data)
      }
      fetchFriendInfo();
    } catch (err) {
      console.log(err)
    }

  }, [onlinefriend]);

  console.log("online ",onlines)

  return (
    <>

      {/* {
        onlines.map((online) => {
          <div className="">
            <h3>{online.username}</h3>
          </div>
        })
      } */}
  

    </>

  )


}
