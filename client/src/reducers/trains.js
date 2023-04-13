// eslint-disable-next-line import/no-anonymous-default-export
export default (trains = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    default:
      return trains;
  }
};
