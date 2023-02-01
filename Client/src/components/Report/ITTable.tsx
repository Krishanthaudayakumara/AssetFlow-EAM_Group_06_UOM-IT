import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Table } from "react-bootstrap";
import {FaTrashAlt}from "react-icons/fa";
import{FaPen} from "react-icons/fa";
import Agents from "./Agentdata";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


const ITTable: React.FC = () => {
  return (
    
    <Fragment>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: "30px 0 0 65px" }}
      >
    
             
              
    <Table
              className="table w-100 small table-borderless table-responsiv align-middle align-left"
              hover
              style={{ fontSize: "14px" }}
            >
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th></th>
                  <th>Agent Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>E mail</th>
                  <th>Pending</th>
                  <th>Completed</th>
                  
                </tr>
              </thead>
              <tbody>
                {Agents && Agents.length > 0
                  ? Agents.map((agent) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src="/img/krish.png"
                              alt="User profile"
                              className="rounded-circle"
                              style={{ width: "45px", height: "45px" }}
                            />
                          </td>

                          <td>{agent.agent_name}</td>
                          <td className="text-secondary">
                            {agent.agent_position}
                          </td>
                          <td className="text-secondary">
                            {agent.agent_department}
                          </td>
                          <td className="text-secondary">
                            {agent.agent_email}
                          </td>
                          <td className="text-secondary">
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {agent.agent_pending}
                          </td>
                          <td className="text-secondary">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {agent.agent_completed}
                          </td>
                          <td>
                            
                          </td>
                          
                        </tr>
                      );
                    })
                  : "No data available"}
              </tbody>
            </Table>
     
    </div>
    </Fragment>
    
  );
};

export default ITTable;
