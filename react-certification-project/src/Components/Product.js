import React, { useEffect, useState } from "react";
import "../Styles/Details.css";
import axios from "../Utils/axios";

// Functional component named Product
const Product = () => {
  // Check if user is logged in
  let isLogin = sessionStorage.getItem("isLogin");

  // State variables for managing data, loading state, and filter checkboxes
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State variables for filter checkboxes and availability
  const [isCheckedExpired, setCheckedExpired] = useState(true);
  const [isCheckedLowStock, setCheckedLowStock] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  // Get the current date
  var currentDate = new Date();

  // Function to fetch data from the API based on filter checkboxes
  const getAPIData = async () => {
    try {
      const res = await axios.get("/products");
      let filteredData = res.data.filter((product) => {
        var expiryDate = new Date(product.expiryDate);
        return (
          (isCheckedExpired && currentDate > expiryDate) ||
          (isCheckedLowStock && product.stock < 100) ||
          (isAvailable && currentDate < expiryDate && product.stock > 100)
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
      case "expired":
        setCheckedExpired(!isCheckedExpired);
        break;
      case "lowStock":
        setCheckedLowStock(!isCheckedLowStock);
        break;
      default:
        break;
    }
  };

  // Fetch data on component mount and whenever filter checkboxes change
  useEffect(() => {
    getAPIData();
  }, [isCheckedExpired, isCheckedLowStock]);

  return isLogin === "true" ? (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mainContainer">
          <h1 className="mainHeading">Products</h1>
          <div className="subContainer">
            {/* Filters */}
            <div className="filter">
              <h3 className="filterHeading">Filters</h3>
              <div className="filterOptionsDiv">
                <p className="countsDisplay" id="countsDisplay">
                  Count: {myData.length}{" "}
                </p>
                <div className="filterContainer">
                  <input
                    type="checkbox"
                    id="expired"
                    value="expired"
                    className="filterInput"
                    onChange={() => handleCheckBoxClick("expired")}
                    checked={isCheckedExpired}
                  />
                  <label htmlFor="expired" className="filterLabel">
                    {" "}
                    Expired{" "}
                  </label>
                </div>
                <div className="filterContainer">
                  <input
                    type="checkbox"
                    id="lowStock"
                    value="lowStock"
                    className="filterInput"
                    onChange={() => handleCheckBoxClick("lowStock")}
                    checked={isCheckedLowStock}
                  />
                  <label htmlFor="lowStock" className="filterLabel">
                    {" "}
                    Low Stock{" "}
                  </label>
                </div>
              </div>
            </div>
            {/* Table container */}
            <div className="tableContainer">
              <table className="tableDesign">
                <tr className="tableHeadingRow">
                  <th className="tableHeading">ID</th>
                  <th className="tableHeading">Product Name</th>
                  <th className="tableHeading">Product Brand</th>
                  <th className="tableHeading">Expiry Date</th>
                  <th className="tableHeading">Unit Price</th>
                  <th className="tableHeading">Stock</th>
                </tr>
                <tbody className="tableBody">
                  {myData.map((product) => {
                    // Format the expiry date
                    const parsedDate = new Date(product.expiryDate);
                    const day = parsedDate.getDate();
                    const month = parsedDate.toLocaleString("default", {
                      month: "short",
                    });
                    const year = parsedDate.getFullYear();
                    const modifiedDateFormat = `${day} ${month}, ${year}`;
                    // Render each row with product data
                    return (
                      <tr className="rowData" key={product.id}>
                        <td className="dataStyle1 idStyle">{product.id}</td>
                        <td className="dataStyle2">{product.medicineName}</td>
                        <td className="dataStyle1">{product.medicineBrand}</td>
                        <td className="dataStyle2 dateStyle2">
                          {modifiedDateFormat}
                        </td>
                        <td className="dataStyle1">${product.unitPrice}</td>
                        <td className="dataStyle1">{product.stock}</td>
                      </tr>
                    );
                  })}
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

export default Product;
