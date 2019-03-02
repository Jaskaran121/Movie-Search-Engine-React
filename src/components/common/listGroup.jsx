import React, { Component } from "react";
import _ from "lodash";

const ListGroup = props => {
  const {
    items: genres,
    onItemSelect,
    textProperty,
    valueProperty,
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
<<<<<<< HEAD
       
=======
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
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
