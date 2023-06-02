import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAccessLog } from "../../api/userApi";

interface AccessLog {
  id: string;
  accessTime: string;
  ipAddress: string;
}

const UserAccessLogPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [accessLog, setAccessLog] = useState<AccessLog[]>([]);

  useEffect(() => {
    const fetchAccessLog = async () => {
      try {
        const response = await getAccessLog(userId);
        setAccessLog(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccessLog();
  }, [userId]);

  return (
    <div>
      <h2>User Access Log</h2>
      <div className="access-log-container">
        {accessLog.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Access Time</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {accessLog.map((log) => (
                <tr key={log.id}>
                  <td>{log.accessTime}</td>
                  <td>{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No access log found.</p>
        )}
      </div>
      <Link to="/user" className="btn btn-primary">Back to Users</Link>
    </div>
  );
};

export default UserAccessLogPage;
