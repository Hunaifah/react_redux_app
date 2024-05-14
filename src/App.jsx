import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./redux/slices/counterSlice";
import { fetchUser } from "./redux/slices/userSlice";

function CombinedComponent() {
  const dispatch = useDispatch();

  // Counter State
  const count = useSelector(state => state.counter.value);
  // User State
  const userData = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.loading);
  // State to control user detail visibility
  const [showUserDetail, setShowUserDetail] = React.useState(false);

  // Fetch User Data on Component Mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Toggle User Detail Visibility
  const toggleUserDetail = () => {
    setShowUserDetail(!showUserDetail);
  };

  // Render Loading if Data is Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Counter Component */}
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={() => { dispatch(increment()); toggleUserDetail(); }}>Increment</button>
          <span>{count}</span>
          <button onClick={() => { dispatch(decrement()); toggleUserDetail(); }}>Decrement</button>
        </div>
        <div>
          <input
            type="number"
            onChange={(e) => dispatch(incrementByAmount(parseInt(e.target.value) || 0))}
            placeholder="Enter value"
          />
          <button onClick={() => { dispatch(incrementByAmount(5)); toggleUserDetail(); }}>Add 5</button>
        </div>
      </div>

      {/* User Details (conditionally rendered based on showUserDetail state) */}
      {showUserDetail && (
        <div>
          <h2>User Details</h2>
          {userData?.map((item) => (
            <div key={item.id}>
              <span>Name: {item.name}</span>
              <span> - </span>
              <span>Email: {item.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CombinedComponent;