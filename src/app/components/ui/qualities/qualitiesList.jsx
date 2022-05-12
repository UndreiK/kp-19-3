import React from "react"
import PropTypes from "prop-types"
import Quality from "./quality"

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((i) => (
        <Quality {...i} key={i._id} />
      ))}
    </>
  )
}

export default QualitiesList

QualitiesList.propTypes = {
  qualities: PropTypes.array
}
