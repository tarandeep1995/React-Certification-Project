import React, { useEffect, useState } from "react";
import "../Styles/Details.css";
import axios from "../Utils/axios";

const Orders = () => {
  // Check if user is logged in
  const isLogin = sessionStorage.getItem("isLogin");

  // State variables for managing data, loading state, and filter checkboxes
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckedNew, setCheckedNew] = useState(true);
  const [isCheckedPacked, setCheckedPacked] = useState(true);
  const [isCheckedInTransit, setCheckedInTransit] = useState(true);
  const [isCheckedDelivered, setCheckedDelivered] = useState(true);

  // Function to fetch data from the API based on filter checkboxes
  const getAPIData = async () => {
    try {
      const res = await axios.get("/orders");
      let filteredData = res.data.filter((order) => {
        return (
          (isCheckedNew && order.orderStatus === "New") ||
          (isCheckedPacked && order.orderStatus === "Packed") ||
          (isCheckedInTransit && order.orderStatus === "InTransit") ||
          (isCheckedDelivered && order.orderStatus === "Delivered")
        );
      });
      setMyData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Event handler for handling checkbox clicks
  const handleCheckBoxClick = (checkboxType) => {
    switch (checkboxType) {
      case "new":
        setCheckedNew(!isCheckedNew);
        break;
      case "packed":
        setCheckedPacked(!isCheckedPacked);
        break;
      case "intransit":
        setCheckedInTransit(!isCheckedInTransit);
        break;
      case "delivered":
        setCheckedDelivered(!isCheckedDelivered);
        break;
      default:
        break;
    }
  };

  // Fetch data on component mount and whenever filter checkboxes change
  useEffect(() => {
    getAPIData();
  }, [isCheckedNew, isCheckedPacked, isCheckedInTransit, isCheckedDelivered]);

  // JSX structure for the Orders component
  return isLogin === "true" ? (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mainContainer">
          {/* Header */}
          <h1 className="mainHeading">Orders</h1>
          {/* Sub-container with filters and table */}
          <div className="subContainer">
            {/* Filters */}
            <div className="filter">
              <h3 className="filterHeading">Filters</h3>
              <div className="filterOptionsDiv">
                <p className="countsDisplay" id="countsDisplay">
                  Count: {myData.length}{" "}
                </p>
                {/* Filter checkboxes */}
                {/* Each checkbox has an associated label and an event handler */}
                {/* Checked state is controlled by the corresponding state variables */}
                {/* e.g., handleCheckBoxClick('new') is triggered when the 'New' checkbox changes */}
                <div className="filterContainer">
                  <input
                    type="checkbox"
                    id="new"
                    value="new"
                    className="filterInput"
                    onChange={() => handleCheckBoxClick("new")}
                    checked={isCheckedNew}
                  />
                  <label htmlFor="new" className="filterLabel">
                    {" "}
                    New{" "}
                  </label>
                </div>

                <div className="filterContainer">
                  <input
                    type="checkbox"
                    id="packed"
                    value="packed"
                    className="filterInput"
                    onChange={() => handleCheckBoxClick("packed")}
                    checked={isCheckedPacked}
                  />
                  <label htmlFor="packed" className="filterLabel">
                    {" "}
                    Packed{" "}
                  </label>
                </div>

                <div className="filterContainer">
                  <input
                    type="checkbox"
                    id="intransit"
                    value="intransit"
                    className="filterInput"
                    onChange={() => handleCheckBoxClick("intransit")}
                    checked={isCheckedInTransit}
                  />
                  <label htmlFor="intransit" className="filterLabel">
                    {" "}
                    In Transit{" "}
                  </label>
                </div>

                <div className="filterContainer">
                  <input
                    type="checkbox"
                    id="delivered"
                    value="delivered"
                    className="filterInput"
                    onChange={() => handleCheckBoxClick("delivered")}
                    checked={isCheckedDelivered}
                  />
                  <label htmlFor="delivered" className="filterLabel">
                    {" "}
                    Delivered{" "}
                  </label>
                </div>
              </div>
            </div>
            {/* Table container */}
            <div className="tableContainer">
              <table className="tableDesign">
                <tr className="tableHeadingRow">
                  <th className="tableHeading">ID</th>
                  <th className="tableHeading">Customer</th>
                  <th className="tableHeading">Date</th>
                  <th className="tableHeading">Amount</th>
                  <th className="tableHeading">Status</th>
                </tr>
                <tbody className="tableBody">
                  {myData.map((order) => (
                    <tr className="rowData" key={order.id}>
                      <td className="dataStyle1">{order.id}</td>
                      <td className="dataStyle2">{order.customerName}</td>
                      <td className="dataStyle2">
                        {order.orderDate}
                        <br />
                        <span className="dataStyle1 timeStyle">
                          {order.orderTime}{" "}
                        </span>
                      </td>
                      <td className="dataStyle1">${order.amount}</td>
                      <td className="dataStyle2">{order.orderStatus} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default Orders;
