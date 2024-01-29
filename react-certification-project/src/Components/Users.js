import React, { useState, useEffect } from "react";
import "../Styles/Users.css";
import axios from "../Utils/axios";

const Users = () => {
  // Check if user is logged in
  let isLogin = sessionStorage.getItem("isLogin");

  // State variables for managing data, loading state, and user search
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  // Function to fetch all users' data
  const getAPIData = async () => {
    try {
      const res = await axios.get("/users");
      setMyData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch filtered users' data based on user name
  const getUsersData = async () => {
    try {
      const res = await axios.get(`/users?fullName=${userName}`);
      setMyData(res.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users' data on component mount
  useEffect(() => {
    getAPIData();
  }, []);

  // Event handler for updating the userName state on search input change
  const handleUserSearch = (e) => {
    setUserName(e.target.value);
  };

  // Event handler for handling search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (userName.length < 2) {
      alert("Please enter at least two characters");
    } else {
      getUsersData();
    }
  };

  // Event handler for resetting the search
  const handleReset = () => {
    setUserName("");
    getAPIData();
  };

  return isLogin === "true" ? (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mainContainer">
          {/* Header */}
          <h1 className="mainHeading">Users</h1>
          {/* Sub-container with search form and table */}
          <div className="subContainer2">
            {/* Search form */}
            <form
              className="formDesign"
              id="searchForm"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="search"
                name="searchBar"
                id="searchBar"
                value={userName}
                onChange={handleUserSearch}
                className="searchBar"
                placeholder="Search by Name"
              />
              <input
                type="reset"
                value="Reset"
                className="resetBtn"
                id="resetBtn"
                onClick={handleReset}
              />
            </form>
            <div className="tableDiv">
              <table className="tableDesign">
                <tr className="tableHeadingRow">
                  <th className="tableHeading">ID</th>
                  <th className="tableHeading">User Avatar</th>
                  <th className="tableHeading">Full Name</th>
                  <th className="tableHeading">DoB</th>
                  <th className="tableHeading">Gender</th>
                  <th className="tableHeading">Current Location</th>
                </tr>
                <tbody className="tableBody">
                  {myData.map((user) => {
                    const parsedDate = new Date(user.dob);
                    const day = parsedDate.getDate();
                    const month = parsedDate.toLocaleString("default", {
                      month: "short",
                    });
                    const year = parsedDate.getFullYear();
                    const modifiedDateFormat = `${day} ${month}, ${year}`;
                    return (
                      <tr className="rowData" key={user.id}>
                        <td className="dataStyle1 idStyle"> {user.id} </td>
                        <td>
                          <img
                            src={user.profilePic}
                            alt={`${user.id}+profile`}
                            className="image"
                          />{" "}
                        </td>
                        <td className="dataStyle1">{user.fullName}</td>
                        <td className="dataStyle2">{modifiedDateFormat}</td>
                        <td className="dataStyle1">{user.gender}</td>
                        <td className="dataStyle1">
                          {user.currentCity}, {user.currentCountry}{" "}
                        </td>
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

export default Users;
