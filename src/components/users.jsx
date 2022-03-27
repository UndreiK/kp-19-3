import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll)

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user !== userId))
  }

  const renderPhrase = (number) => {
    number = users.length
    return number === 0
      ? 'бугага. сегодня ты тусуешь с рукой))'
      : number % 100 > 4 && number % 100 < 20
        ? `${number} человек тусанет с тобой сегодня`
        : number % 10 < 5 && number % 10 > 1
          ? `${number} человека тусанет с тобой сегодня`
          : `${number} человек тусанет с тобой сегодня`
  }


  // const getBadgeClasses = () => {
  //   let classes = users.map((user) => user.qualities.map((i) => 'badge m-2 bg-' + i.color))
  //   console.log(classes)
  //   return classes
  // }


  return (
    <>
      <span className={users < 1
        ? 'badge bg-danger fs-4 m-2'
        : 'badge bg-primary fs-4 m-2'}>{renderPhrase()}</span>
      {users.length > 0
        ? <table className='table table-striped'>
          <thead className='table-secondary'>
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
            <td>{user.qualities.map((i) =>
              <span key={i._id} className={'badge m-2 bg-' + i.color}>{i.name}</span>)}</td>
            {/*<span key={i._id} className={getBadgeClasses()}>{i.name}</span>)}</td>*/}
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
              <button key={user._id} className="btn btn-danger"
                      onClick={() => handleDelete(user)}>delete
              </button>
            </td>
          </tr>)}
          </tbody>
        </table>
        : null}
    </>
  )

}

export default Users