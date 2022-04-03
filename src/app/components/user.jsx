import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";


const User = ({name, _id, qualities, profession, completedMeetings, rate, bookmark, onDelete, onToggleBookmark}) => {


  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{qualities.map((i) =>
        <span key={i._id} className={`badge m-2 bg-${i.color}`}>{i.name}</span>)}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>{<Bookmark status={bookmark} id={_id} onToggleBookmark2={onToggleBookmark}/>}</td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>delete</button>
      </td>
    </tr>)
}

export default User