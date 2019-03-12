import React from "react";

const ListGroup = props => {
  const {
    items: genres,
    onItemSelect,
    textProperty,
    selectedGenre
  } = props;
  return genres.map(genre => (
    <ul
      className="list-group"
      key={genre[textProperty]}
      onClick={() => onItemSelect(genre[textProperty])}
    >
      <li
        className={
          selectedGenre === genre[textProperty]
            ? "list-group-item active"
            : "list-group-item"
        }
       
      >
        {genre.name}
      </li>
    </ul>
  ));
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
