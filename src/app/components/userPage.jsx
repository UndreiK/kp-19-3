import React, { useEffect, useState } from "react"
import API from "../api"
import QualitiesList from "./qualitiesList"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  })

  const handleClick = () => {
    history.push("/users")
  }

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h3>Rate: {user.rate}</h3>
        <button onClick={handleClick}>все пользователи</button>
      </div>
    )
  } else {
    return <span>Loading</span>
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
