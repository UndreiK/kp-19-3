import React from "react"
import PropTypes from "prop-types"

const Quality = ({ id, color, name }) => {
  return (
    <span key={id} className={`badge m-2 bg-${color}`}>
      {name}
    </span>
  )
}

Quality.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
}

export default Quality
