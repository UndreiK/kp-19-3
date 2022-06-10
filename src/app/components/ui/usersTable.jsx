import React from "react"
import PropTypes from "prop-types"
// import User from "./user"
import Table, { TableBody, TableHeader } from "../common/table"
import Bookmark from "../common/bookmark"
import Qualities from "./qualities"
import { Link } from "react-router-dom"
import Profession from "./profession"

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: {
      path: "name",
      name: "имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: {
      name: "профессия",
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "встретился, раз"
    },
    rate: { path: "rate", name: "оценка" },
    bookmark: {
      path: "bookmark",
      name: "избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          delete
        </button>
      )
    }
  }
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    >
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UserTable
