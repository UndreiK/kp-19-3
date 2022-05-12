import React from "react"
import { useParams } from "react-router-dom"
import UserPage from "../components/page/userPage"
import UsersListPage from "../components/page/usersListPage"

const Users = () => {
  const params = useParams()
  const { userId } = params
  return <div>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</div>
}

export default Users
