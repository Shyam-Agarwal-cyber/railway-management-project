import "./ViewAllBookings.css";
import { useEffect, useState, useCallback } from "react";
import * as api from "../../api";
import { getAllBookings } from "../../api";

//display all bookings made by all users

const ViewAllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getAllBookings();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const onDelete = useCallback((id) => {
    const data = api.deleteBook(id);
    console.log(data);
  }, []);


  return (
    <div className="view-all-bookings">
      <h1 className="heading">All Bookings</h1>
      <div className="bookings-container">
        {bookings.length > 0 ? bookings.map((booking) => (
          <div className="booking-item">
            <h3>Booking ID: {booking.bookingId}</h3>
            <h3>User Name: {booking.userDetails[0].name}</h3>
            <h3>User Email: {booking.userDetails[0].email}</h3>
            <h3>User Phone: {booking.userDetails[0].phone}</h3>
            <h3>Train Number: {booking.trainDetails[0].trainId}</h3>
            <h3>Train Name: {booking.trainDetails[0].name}</h3>
            <button onClick={onDelete(booking.bookingId)}>Cancel Booking</button>
          </div>
        )) : <div>No Bookings</div>}
      </div>
    </div>
  );
};

export default ViewAllBookings;
