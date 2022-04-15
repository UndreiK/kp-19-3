import React from "react"
import PropTypes from "prop-types"

const Bookmark = ({ status, ...rest }) => {
  return (
    <button onClick={() => rest.onToggleBookmark2(rest.id)}>
      {status ? (
        <i className="bi bi-bookmark-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired
}

export default Bookmark
