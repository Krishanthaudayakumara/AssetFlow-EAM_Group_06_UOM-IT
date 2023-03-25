import React, { useEffect, useState, ChangeEvent } from "react";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import axios from "axios";

interface BuildingData {
  id: string;
  buildingName: string;
  floorNo: number;
}

function BuildingFloorTable() {
  const [buildingData, setBuildingData] = useState<BuildingData[]>([]);
  const [editing, setEditing] = useState(false);

  const [editData, setEditData] = useState<BuildingData>({
    id: "",
    buildingName: "",
    floorNo: 0,
  });

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axios.get<BuildingData[]>(
          "http://localhost:5298/api/Building"
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
      .put(`http://localhost:5298/api/Building/${editData?.id}`, editData)
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
    const deleteData = buildingData.filter((a) => a.id !== id);
    setBuildingData(deleteData);

    axios
      .delete(`http://localhost:5298/api/Building/delete-asset-by-id/${id}`)
      .then((response) => {
        console.log(response.data);
        // refetch the data after the row is deleted
        axios
          .get<BuildingData[]>("http://localhost:5298/api/Building")
          .then((response) => {
            setBuildingData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
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
  );
}

export default BuildingFloorTable;
