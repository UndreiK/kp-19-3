import React, { useState } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import User from "./user"
import PropTypes from "prop-types"

const Users = ({ users, ...rest }) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    console.log("page: ", pageIndex)
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(users, currentPage, pageSize)

  // const getBadgeClasses = (item) => {
  //   let classes = `badge m-2 bg-${item.color}`
  //   return classes
  // }

  return (
    <>
      {count > 0 && (
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <th scope="col">имя</th>
              <th scope="col">качества</th>
              <th scope="col">профессия</th>
              <th scope="col">встретился, раз</th>
              <th scope="col">оценка</th>
              <th scope="col">избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                // _id={user._id}
                // name={user.name}
                // qualities={user.qualities}
                // profession={user.profession}
                // completedMeetings={user.completedMeetings}
                // rate={user.rate}
                {...user}
                {...rest}
              />
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

Users.propTypes = {
  users: PropTypes.number.isRequired
}

export default Users
