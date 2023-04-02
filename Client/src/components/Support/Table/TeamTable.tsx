import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface teamType {
    profileImage:string,
    id:number,
    name:string,
    description:string,
    issueTypeId:number
    
}
const TeamTable = () => {
    const [teams,setTeams]=useState<teamType[]>([])
    useEffect(()=>{
        axios.get("http://localhost:5224/Api/Team").then((response)=>{
        setTeams(response.data) 
        }).catch((error)=>{
            alert(error)
        })
    },[])
    const handleDeleteTeam = (team: teamType) => {
      axios
        .delete(`http://localhost:5224/Api/Team/${team.id}`)
        .then((response) => {
          setTeams(teams.filter((item) => item.id !== team.id));
          alert("Successfully deleted!");
        })
        .catch((error) => {
          alert("Not deleted!");
        });
    };
    return(
        <div>
             <p style={{margin: "0 0 30px 70px",color: "#482890",fontSize: "18px",fontWeight: "bold",}}>Support Teams</p>
             <div  className="shadow p-3 bg-white rounded" style={{ margin: "30px 0 0 65px" }} >
             <Fragment>
             <div>
             <Table className="table w-100 small table-borderless table-responsiv align-middle align-left" hover  style={{ fontSize: "14px" }}>
                <thead>
                <tr style={{ color: "#482890" }}> 
                  <th></th>                 
                  <th>Team Id</th>
                  <th>Team Name</th>
                  <th>Team Descrption</th> 
                  <th>Issue Id</th>
                  <th>Action</th>                
                </tr>
                </thead>
                <tbody>
                {teams.map((team)=>(<tr key={team.id}>
                  <td>
                  {" "}
                      <img
                        src={`http://localhost:5224/ProfileImages/${team.profileImage}`}
                        alt="User profile"
                        className="rounded-circle"
                        style={{
                          width: "45px",
                          height: "45px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
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
                              onClick={() => handleDeleteTeam(team)}
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