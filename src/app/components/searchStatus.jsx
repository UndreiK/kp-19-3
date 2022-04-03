import React from "react";

const SearchStatus = ({length}) => {

  return (
    <span className={length < 1
      ? 'badge bg-danger fs-4 m-2'
      : 'badge bg-primary fs-4 m-2'}>
          {length === 0
            ? 'бугага. сегодня ты тусуешь с рукой))'
            : length % 100 > 4 && length % 100 < 20
              ? `${length} человек тусанет с тобой сегодня`
              : length % 10 < 5 && length % 10 > 1
                ? `${length} человека тусанет с тобой сегодня`
                : `${length} человек тусанет с тобой сегодня`}
    </span>
  )
}

export default SearchStatus