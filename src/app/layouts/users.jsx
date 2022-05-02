import React from "react"
import { useParams } from "react-router-dom"
import UsersList from "../components/usersList"

const Users = () => {
  const params = useParams()
  const { userId } = params
  return (
    <>
      <h1>{userId ? <UserPage userId={userId} /> : <UsersList />}</h1>
    </>
  )
}

export default Users
