import React, { useEffect, useState, ChangeEvent } from "react";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import axios from "axios";
import { Modal,Button } from "react-bootstrap";
import {RiDeleteBin5Line} from "react-icons/ri";

interface BuildingData {
  id: string;
  buildingName: string;
  floorNo: number;
}

function BuildingFloorTable() {
  const [buildingData, setBuildingData] = useState<BuildingData[]>([]);
  const [editing, setEditing] = useState(true);
  const[deleteId,setDeleteId]=useState("");
  const[show,setShow]=useState(false);

  const [editData, setEditData] = useState<BuildingData>({
    id: "",
    buildingName: "",
    floorNo: 0,
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
    setEditData({...row});
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
        setEditData({ id: "", buildingName: "", floorNo: 0 }); // clear editData state
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    setEditing(false);
    setEditData({ id: "", buildingName: "", floorNo: 0 });
    
  };

  function handleDelete(id: string) {
    setShow(true);
    setDeleteId(id);
  } 
  

  const handleConfirmDelete=()=> {
    
    //const deleteData = buildingData.filter((a) => a.id !== id);
    //setBuildingData(deleteData);
    //setShow(true);
    //setDeleteId(id);



    axios
      .delete(`http://localhost:5087/api/Building/delete-asset-by-id/${deleteId}`)
      .then((response) => {
        //console.log(response.data);
        // refetch the data after the row is deleted
        setBuildingData(prevState => prevState.filter(row => row.id !== deleteId));
        setShow(false);
        axios
          .get<BuildingData[]>("http://localhost:5087/api/Building")
          .then((response) => {
            //setBuildingData(response.data);

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleClose =()=>{
    setShow(false);
  }

  

  return (
    <div>
       <Modal show ={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <RiDeleteBin5Line style={{ color: '#FF0000', fontSize: '70px' ,position:"relative",left:"200px"}} />
</div>
                 
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="alert alert-danger">Do you want to delete</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Close</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    <div style={{ margin: "5rem" }}>
      <div
        className="shadow p-2 mb- bg-white rounded"
        style={{ width: "800px" }}
      >
        <Table
          className="table w-100 small text-center"
          hover
          align="center"
          style={{ fontSize: "14px", width: "500px" }}
        >
          <thead>
            <tr style={{ color: "#482890" }}>
              <th>b_id</th>
              <th>building Name</th>
              <th colSpan={1}>floor No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buildingData && buildingData.length > 0 ? (
              buildingData.map((a) => {
                return (
                  <tr key={a.id} style={{ textAlign: "center" }}>
                    <td>{a.id}</td>
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
                      <FaTrashAlt
                       

                        style={{ color: " #ff615a " }}
                        
                        onClick={() => handleDelete(a.id)}
                      />
                      {editing && editData.id === a.id ? (
                        <>
                          <button onClick={handleSave}>Save</button>
                          <button onClick={ handleCancel}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <FaPen style={{ color: ' #482890', marginLeft: '10px' }} 
                        onClick={() => handleEdit(a)}  />
                        
                      )}
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
      </div>
    </div>
    </div>
  );
}

export default BuildingFloorTable;
