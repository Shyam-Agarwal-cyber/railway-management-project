import * as api from "../../api";
import "./BookDetail.css";
import { useEffect, useState } from "react";

const BookDetail = (props) => {
  const [train, setTrain] = useState({});

  useEffect(() => {
    api
      .getTrain(props.book.train)
      .then((res) => setTrain(res))
      .catch((err) => console.log(err));
  }, [props.book.train, setTrain]);

  return (
    <div className="book-detail-item">
      <h3>{train.name}</h3>
      <h4>
        from {train.startpoint} to {train.destination}
      </h4>
      <button
        onClick={props.onDelete.bind(this, props.book._id)}
        id="delete-button"
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default BookDetail;
