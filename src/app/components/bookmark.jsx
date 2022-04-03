import React, {useState} from "react";
import api from "../api";

const Bookmark = ({status, ...rest}) => {
  // const [bk, setBK] = useState(false)

  return (
    <>
      <button onClick={() => rest.onToggleBookmark2(rest.id)}>
        {status
          ? <i className="bi bi-bookmark-fill"></i>
          : <i className="bi bi-bookmark"></i>}
      </button>

    </>

  )
}

export default Bookmark