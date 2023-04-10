import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Support/Support.css";
interface teamType {
    profileImage:string,
    id:number,
    name:string,
    description:string,
    issueTypeId:number
    
}
const TeamTable = () => {
    const [teams,setTeams]=useState<teamType[]>([])
    const [showModal, setShowModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<teamType | null>(null);

    useEffect(()=>{
        axios.get("http://localhost:5087/Api/Team").then((response)=>{
        setTeams(response.data) 
        }).catch((error)=>{
            alert(error)
        })
    },[])

    const handleEditTeamClick = (team: teamType) => {
      setSelectedTeam(team);
      setShowModal(true);
    };

    const handleModalClose = () => {
      setSelectedTeam(null);
      setShowModal(false);
    };

    const handleUpdateTeam = () => {
      axios
        .put(
          `http://localhost:5087/Api/Team/${selectedTeam?.id}`,
          selectedTeam
        )
        .then((response) => {
          setTeams(
            teams.map((team) =>
              team.id === selectedTeam?.id ? selectedTeam : team
            )
          );
          setShowModal(false);
          alert("Successfully updated!");
        })
        .catch((error) => {
          alert("Not updated!");
        });
    };

    const handleDeleteTeam = (team: teamType) => {
      axios
        .delete(`http://localhost:5087/Api/Team/${team.id}`)
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
             <p className="table-heading">Support Teams</p>
             <div className="box-shadow">
             <Fragment>
             <div>
             <Table className="support-table">
                <thead>
                <tr style={{ color: "#482890" }}> 
                  <th></th>        
                  <th>Team Name</th>
                  <th>Team Descrption</th>                   
                  <th>Action</th>                
                </tr>
                </thead>
                <tbody>
                {teams.map((team)=>(<tr key={team.id}>
                  <td>                
                      <img
                        src={`http://localhost:5087/ProfileImages/${team.profileImage}`}
                        alt="User profile"
                        className="rounded-circle"
                        style={{
                          width: "45px",
                          height: "45px",
                          cursor: "pointer",
                        }}
                      />
                    </td>               
                 <td>{team.name}</td>
                 <td>{team.description}</td>                 
                 <td>
                            <FontAwesomeIcon                              
                              icon={faPen}
                              style={{ color: "#482890", cursor: "pointer" }}
                              onClick={() => handleEditTeamClick(team)}
                            />
                            &nbsp; &nbsp; &nbsp;
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#FF615A", cursor: "pointer" }}
                              onClick={() => handleDeleteTeam(team)}
                            />
                          </td>
                </tr> ))}
                </tbody>
             </Table>
             </div>
             </Fragment>
             </div>
             <Modal show={showModal} onHide={handleModalClose}>
             {selectedTeam && (
              <>
              <Modal.Header style={{ backgroundColor: "#482890" }}>
              <Modal.Title>
                <div style={{ margin: "20px 180px" }}>
                  <img
                    src={`http://localhost:5087/ProfileImages/${selectedTeam.profileImage}`}
                    alt="User profile"
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px" }}                    
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>             
            <h3>
                <div>
                  {selectedTeam.name}
                </div>
              </h3>
              <form>
              <Form.Group> <Form.Label>Name</Form.Label> <Form.Control type="text" placeholder="Name *"  required  name="name" value={selectedTeam.name} onChange={(e) =>  setSelectedTeam({...selectedTeam,name: e.target.value, })}/>  </Form.Group>
             <br />
             <Form.Group> <Form.Label>Description</Form.Label> <Form.Control type="text" placeholder="Description *"  required  name="description" value={selectedTeam.description} onChange={(e) =>  setSelectedTeam({...selectedTeam,description: e.target.value, })} />  </Form.Group>
             <br/>
             <Form.Group> <Form.Label>Issue Type</Form.Label> <Form.Control type="number" placeholder="Issue Type *"  required  name="issueTypeId" value={selectedTeam.issueTypeId} onChange={(e) =>  setSelectedTeam({...selectedTeam,issueTypeId: Number(e.target.value,) })} />  </Form.Group>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleUpdateTeam()}>Update</Button>             
            </Modal.Footer>
              </>
             )}
             </Modal>
    
    
    </div>
    ) 
};
export default TeamTable;