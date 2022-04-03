import React from "react";
import User from "./user";

const Users = ({users, ...rest}) => {

  // const getBadgeClasses = (item) => {
  //   let classes = `badge m-2 bg-${item.color}`
  //   return classes
  // }

  return (
    <>
      {users.length > 0 &&
        <table className='table table-striped'>
          <thead className='table-secondary'>
          <tr>
            <th scope="col">имя</th>
            <th scope="col">качества</th>
            <th scope="col">профессия</th>
            <th scope="col">встретился, раз</th>
            <th scope="col">оценка</th>
            <th scope="col">избранное</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {users.map((user) => <User
            key={user._id}
            // _id={user._id}
            // name={user.name}
            // qualities={user.qualities}
            // profession={user.profession}
            // completedMeetings={user.completedMeetings}
            // rate={user.rate}
            {...user}
            {...rest}
          />)}
          </tbody>
        </table>}
    </>
  )

}

export default Users