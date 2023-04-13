import "./trainitem.css";
import { useSelector } from "react-redux";
import { createBook } from "../../api/index";

const TrainItem = (props) => {
  const user = useSelector((state) => state.user);

  const buttonClick = async (e) => {
    e.preventDefault();
    const { data } = await createBook(user.id, props.train._id);
    console.log(data);
    alert("Ticket Booked for " + user.name + " on " + props.train.name);
    window.location.reload(false);
  };

  const buttonVisiblity = () => {
    if (user.name) return { visibility: "visible" };
    else return { visibility: "hidden" };
  };

  return (
    <div className="train-item">
      <h4 id="start-destination">Train Number: {props.train.trainId}</h4>
      <h2 id="train-name">{props.train.name}</h2>
      <h4 id="start-destination">
        From : {props.train.startpoint} - To: {props.train.destination}
      </h4>
      <h4 id="start-destination">Seat Availability: {props.train.seats}</h4>
      <div id="date-book">
        <h4 id="startDate">
          Starting Date : {props.train.startDate.slice(0, 10)}
        </h4>
        <h4 id="price">Ticket Price: ₹{props.train.price}</h4>
        <button style={buttonVisiblity()} onClick={buttonClick}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TrainItem;
