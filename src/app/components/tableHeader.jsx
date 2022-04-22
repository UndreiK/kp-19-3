import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      })
    } else {
      onSort({ path: item, order: "asc" })
    }
  }
  return (
    <thead className="table-secondary">
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {/* {selectedSort.path === columns[column].path ? (
              <button>
                <i className="bi bi-caret-down-fill"></i>
              </button>
            ) : (
              <button>
                <i className="bi bi-caret-up-fill"></i>
              </button>
            )} */}
          </th>
        ))}

        {/* <th scope="col">качества</th>
      <th onClick={() => handleSort("profession.name")} scope="col">
        профессия
      </th>
      <th onClick={() => handleSort("completedMeetings")} scope="col">
        встретился, раз
      </th>
      <th onClick={() => handleSort("rate")} scope="col">
        оценка
      </th>
      <th onClick={() => handleSort("bookmark")} scope="col">
        избранное
      </th>
      <th /> */}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
