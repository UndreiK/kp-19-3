import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll)

  const handleDelete = (userId) => {

  }

  const renderPhrase = (number) => {
    number = users.length
    return number > 1 && number < 4 ? `${number} человека тусанет с тобой сегодня` : `${number} человек тусанет с тобой сегодня`
  }


  // const getBadgeClasses = (classes) => {
  //   classes = users.map((qua) => qua.qualities.map((q) => 'badge m-2 ' + q.color))
  //   return classes
  //   console.log('badge m-2 ' + q.color)
  // }


  return (
    <>
      <h2><span className='badge bg-primary'>{renderPhrase()}</span></h2>
      <table className='table'>
        <thead className='table-light'>
        <tr>
          <th scope="col">имя</th>
          <th scope="col">качества</th>
          <th scope="col">профессия</th>
          <th scope="col">встретился, раз</th>
          <th scope="col">оценка</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => <tr key={user._id}>
          <td>{user.name}</td>
          <td className='{getBadgeClasses()}'>{user.qualities.map((q) => <span
            key={q._id}>{q.name}</span>)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
          <td>
            <button key={user._id} className="btn btn-danger" onClick={handleDelete}>delete</button>
          </td>
        </tr>)}
        </tbody>
      </table>
    </>
  )

}

export default Users