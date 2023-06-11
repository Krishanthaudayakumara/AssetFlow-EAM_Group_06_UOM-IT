import React, { useEffect, useState } from "react";
import { Table, Container, InputGroup, Form } from "react-bootstrap";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./../../css/Table.css";

interface BuildingData {
  id: string;
  buildingName: string;
  floorNo: number;
  address: string;
}

function BuildingFloorTable() {
  const [buildingData, setBuildingData] = useState<BuildingData[]>([]);
  const [editing, setEditing] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const [editData, setEditData] = useState<BuildingData>({
    id: "",
    buildingName: "",
    floorNo: 0,
    address: "",
  });

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axios.get<BuildingData[]>(
          "http://localhost:5087/api/Building"
        );
        setBuildingData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchBuildingData();
  }, []);

  const handleToggleEdit = () => {
    setEditing(!editing);
  };

  const handleEdit = (row: BuildingData) => {
    setEditing(true);
    setEditData({ ...row });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: name === "buildingName" ? value : Number(value),
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5087/api/Building/${editData?.id}`, editData)
      .then(() => {
        setBuildingData((prevState) =>
          prevState.map((row) => {
            if (row.id === editData?.id) {
              return editData;
            } else {
              return row;
            }
          })
        );
        setEditing(false);
        setEditData({ id: "", buildingName: "", floorNo: 0, address: "" }); // clear editData state
      })
      .catch((err) => console.log(err));
  };
  
  const handleCancel = () => {
    setEditing(false);
    setEditData({ id: "", buildingName: "", floorNo: 0, address: "" });
  };

  function handleDelete(id: string) {
    setShow(true);
    setDeleteId(id);
  }

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:5087/api/Building/delete-asset-by-id/${deleteId}`
      )
      .then((response) => {
        setBuildingData((prevState) =>
          prevState.filter((row) => row.id !== deleteId)
        );
        setShow(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data);
        } else {
          // Handle other errors
        }
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RiDeleteBin5Line
                style={{
                  color: "#FF0000",
                  fontSize: "70px",
                  position: "relative",
                  left: "200px",
                }}
              />
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="alert alert-danger">Do you want to delete?</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ margin: "5rem" }}>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div
          className="shadow p-2 mb- bg-white rounded"
          style={{ width: "800px" }}
        >
          <Container>
            <Form>
              <InputGroup>
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
              </InputGroup>
            </Form>
            <Table className="table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th>Building Name</th>
                  <th colSpan={1}>floor No</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buildingData && buildingData.length > 0 ? (
                  buildingData
                    .filter((a) =>
                      search.toLowerCase() === ""
                        ? a
                        : a.buildingName.toLowerCase().includes(search)
                    )
                    .map((a) => {
                      return (
                        <tr key={a.id} style={{ textAlign: "center" }}>
                          <td>
                            {editing && editData.id === a.id ? (
                              <input
                                type="text"
                                name="buildingName"
                                value={editData.buildingName}
                                onChange={handleInputChange}
                              />
                            ) : (
                              a.buildingName
                            )}
                          </td>
                          <td>
                            {editing && editData.id === a.id ? (
                              <input
                                type="number"
                                name="floorNo"
                                value={editData.floorNo}
                                onChange={handleInputChange}
                              />
                            ) : (
                              a.floorNo
                            )}
                          </td>
                          <td>
                            {editing && editData.id === a.id ? (
                              <input
                                type="text"
                                name="address"
                                value={editData.address}
                                onChange={handleInputChange}
                              />
                            ) : (
                              a.address
                            )}
                          </td>

                          <td>
                            {editing && editData.id === a.id ? (
                              <>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                              </>
                            ) : (
                              <FontAwesomeIcon
                                icon={faPen}
                                style={{
                                  color: "#482890",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEdit(a)}
                              />
                            )}&nbsp; &nbsp; &nbsp;
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{
                                color: "#FF615A",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDelete(a.id)}
                            />
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan={5}>No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default BuildingFloorTable;
