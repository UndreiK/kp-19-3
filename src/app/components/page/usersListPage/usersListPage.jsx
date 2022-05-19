import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import PropTypes from "prop-types"
import GroupList from "../../common/groupList"
import api from "../../../api"
import SearchStatus from "../../ui/searchStatus"
import UserTable from "../../ui/usersTable"
import _ from "lodash"

const UsersListPage = () => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [users, setUsers] = useState()
  const [filter, setFilter] = useState("")

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookmark = (id) => {
    const bkUsers = users.filter((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark
        return user
      }
      return user
    })
    setUsers(bkUsers)
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, filter])

  const handleProfessionSelect = (item) => {
    if (filter !== "") setFilter("")
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    const filteredUsers = filter
      ? users.filter(
          (user) => user.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users

    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    const changeHandler = (event) => {
      setSelectedProf(undefined)
      setFilter(event.target.value)
    }

    // const getBadgeClasses = (item) => {
    //   let classes = `badge m-2 bg-${item.color}`
    //   return classes
    // }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              очистить
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <input
            type="text"
            placeholder="search..."
            name="filter"
            onChange={changeHandler}
            value={filter}
          />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return "loading"
}

UsersListPage.propTypes = {
  users: PropTypes.array
}

export default UsersListPage
