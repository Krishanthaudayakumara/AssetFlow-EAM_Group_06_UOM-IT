import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface agentType {
    id:number,
    name:string,
    description:string,
    issueTypeId:number
    
}
const TeamTable = () => {
    const [teams,setTeams]=useState<agentType[]>([])
    useEffect(()=>{
        axios.get("http://localhost:5224/Api/Team").then((response)=>{
        setTeams(response.data) 
        }).catch((error)=>{
            alert(error)
        })
    },[])
    return(
        <div>
             <p style={{margin: "0 0 30px 70px",color: "#482890",fontSize: "18px",fontWeight: "bold",}}>Support Teams</p>
             <div  className="shadow p-3 bg-white rounded" style={{ margin: "30px 0 0 65px" }} >
             <Fragment>
             <div>
             <Table className="table w-100 small table-borderless table-responsiv align-middle align-left" hover  style={{ fontSize: "14px" }}>
                <thead>
                <tr style={{ color: "#482890" }}>                  
                  <th>Team Id</th>
                  <th>Team Name</th>
                  <th>Team Descrption</th> 
                  <th>Issue Id</th>
                  <th>Action</th>                
                </tr>
                </thead>
                <tbody>
                {teams.map((team)=>(<tr key={team.id}>
                 <td>{team.id}</td>
                 <td>{team.name}</td>
                 <td>{team.description}</td>
                 <td>{team.issueTypeId}</td>
                 <td>
                            <FontAwesomeIcon
                              
                              icon={faPen}
                              style={{ color: "#482890" }}
                            />
                            &nbsp; &nbsp; &nbsp;
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#FF615A" }}
                            />
                          </td>
                </tr> ))}
                </tbody>
             </Table>
             </div>
             </Fragment>
             </div>
    
    
    </div>
    ) 
};
export default TeamTable;