import React, { useEffect, useState } from "react";
import axios from "axios";
interface agentType {
    id:number,
    name:string,
    description:string,
    issueTypeId:number
    
}
const TeamTable = () => {
    const [agents,setAgents]=useState<agentType[]>([])
    useEffect(()=>{
        axios.get("http://localhost:5224/Api/Team").then((response)=>{
        setAgents(response.data) 
        }).catch((error)=>{
            alert(error)
        })
    },[])
    return <div><h2>Team Information</h2>
    <table>
        <thead className="table table-dark">
        <tr>
            <th>Team Id</th>
            <th>Team Name</th>
            <th>Team Descrption</th>
            <th>Issue Id</th>
        </tr>
        </thead>
        <tbody className="table table-succes">
        {agents.map((team)=>(<tr key={team.id}>
            <td>{team.id}</td>
            <td>{team.name}</td>
            <td>{team.description}</td>
            <td>{team.issueTypeId}</td>
        </tr>

        ))}
        </tbody>
    </table>
    
    </div>
};
export default TeamTable;