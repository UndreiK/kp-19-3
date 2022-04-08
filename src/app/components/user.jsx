import React from "react"
import Bookmark from "./bookmark"
import PropTypes from "prop-types"

const User = ({
  name,
  _id,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((i) => (
          <span key={i._id} className={`badge m-2 bg-${i.color}`}>
            {i.name}
          </span>
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        {
          <Bookmark
            status={bookmark}
            id={_id}
            onToggleBookmark2={onToggleBookmark}
          />
        }
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  qualities: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  completedMeetings: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  bookmark: PropTypes.func.isRequired
}

export default User
