/* eslint-disable import/no-anonymous-default-export */
export default (books = [], action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return action.payload;
    default:
      return books;
  }
};
