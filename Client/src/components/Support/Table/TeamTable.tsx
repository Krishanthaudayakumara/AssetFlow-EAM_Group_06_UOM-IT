import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Form, InputGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import EditTeamForm from "../Forms/Team/EditTeamForm";
import "../../../css/Support/Support.css";
import UpdateConfirmation from "../ConfirmMessages/UpdateConfirmation";

interface teamType {
  profileImage: string;
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
}

const TeamTable = () => {
  const [teams, setTeams] = useState<teamType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<teamType | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

  useEffect(() => {
    axios
      .get("http://localhost:5087/Api/Team")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleEditTeamClick = (team: teamType) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleUpdateTeam = () => {
    axios
      .put(`http://localhost:5087/Api/Team/${selectedTeam?.id}`, selectedTeam)
      .then((response) => {
        setTeams(
          teams.map((team) =>
            team.id === selectedTeam?.id ? selectedTeam : team
          )
        );
        setShowModal(false);
        setShowUpdateModal(true);
      })
      .catch((error) => {
        alert("Not updated!");
      });
  };

  const handleModalClose = () => {
    setSelectedTeam(null);
    setShowModal(false);
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

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <p className="table-heading">Support Teams</p>
        </div>
        <div className="col-1">
          <Form>
            <InputGroup style={{ width: "300px" }}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Support Team"
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th></th>
                  <th>Team Name</th>
                  <th>Team Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teams
                  .filter((issue) => {
                    return search.toLowerCase() === ""
                      ? issue
                      : issue.name.toLowerCase().includes(search);
                  })
                  .slice(
                    (currentPage - 1) * recordsPerPage,
                    currentPage * recordsPerPage
                  )
                  .map((team) => (
                    <tr key={team.id}>
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
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>
      <EditTeamForm
        showModal={showModal}
        selectedTeam={selectedTeam}
        handleModalClose={handleModalClose}
        handleUpdateTeam={handleUpdateTeam}
        setSelectedTeam={setSelectedTeam}
      />
       <UpdateConfirmation
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        updatedName={selectedTeam?.name || ""}
      />
    </div>
  );
};

export default TeamTable;
