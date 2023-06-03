import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/User/profile.css";

const API_URL = "http://localhost:5087/api/auth";

interface UserProfile {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    lastAccess: string;
  };
  accessLogs: Array<{
    id: number;
    accessTime: string;
    ipAddress: string;
    userId: string;
    user: null;
  }> | null;
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    hireDate: string;
    jobTitle: string;
    departmentId: number;
    userName: string;
    password: null;
  } | null;
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle the case when the token is not available
          return;
        }
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const username = decodedToken.unique_name;

        const response = await axios.get<UserProfile>(
          `${API_URL}/users/${username}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform save operation here

    setIsEditing(false);
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const { user, employee, accessLogs } = userProfile;
  const fullName = employee
    ? `${employee.firstName} ${employee.middleName} ${employee.lastName}`
    : "Unknown";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{fullName}</h2>
          <p>{employee?.jobTitle}</p>
          <p>Department: {employee?.departmentId}</p>
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>

      <h3>Employee Details</h3>
      <div className="profile-details">
        {employee ? (
          <>
            <p>
              <span className="label">First Name:</span>{" "}
              {isEditing ? (
                <input type="text" value={employee.firstName} />
              ) : (
                employee.firstName
              )}
            </p>
            <p>
              <span className="label">Last Name:</span>{" "}
              {isEditing ? (
                <input type="text" value={employee.lastName} />
              ) : (
                employee.lastName
              )}
            </p>
            <p>
              <span className="label">Email:</span>{" "}
              {isEditing ? (
                <input type="text" value={employee.email} />
              ) : (
                employee.email
              )}
            </p>
            <p>
              <span className="label">Phone Number:</span>{" "}
              {isEditing ? (
                <input type="text" value={employee.phoneNumber} />
              ) : (
                employee.phoneNumber
              )}
            </p>
            <p>
              <span className="label">Date of Birth:</span>{" "}
              {employee.dateOfBirth
                ? new Date(employee.dateOfBirth).toLocaleDateString()
                : "Not available"}
            </p>
            <p>
              <span className="label">Hire Date:</span>{" "}
              {employee.hireDate
                ? new Date(employee.hireDate).toLocaleDateString()
                : "Not available"}
            </p>
          </>
        ) : (
          <p>No employee details available.</p>
        )}
      </div>

      <h3>Access Logs</h3>
      <div className="access-logs">
        {accessLogs ? (
          accessLogs.map((log) => (
            <div key={log.id} className="access-log">
              <p>
                <span className="label">Access Time:</span>{" "}
                {new Date(log.accessTime).toLocaleString()}
              </p>
              <p>
                <span className="label">IP Address:</span> {log.ipAddress}
              </p>
            </div>
          ))
        ) : (
          <p>No access logs available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
