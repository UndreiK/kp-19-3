import React from "react"
import PropTypes from "prop-types"
import Quality from "./quality"
import { useQuality } from "../../../hooks/useQuality"

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality()
  if (isLoading) {
    return "loading..."
  }
  return (
    <>
      {qualities.map((i) => (
        <Quality id={i} key={i} />
      ))}
    </>
  )
}

export default QualitiesList

QualitiesList.propTypes = {
  qualities: PropTypes.array
}
