import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {  Table } from 'react-bootstrap'
import BuildingFloor from './BuildingFloordata'
import { FaTrashAlt } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'

function FacilityTable() {
  return (
    <div style={{ margin: '5rem' }}>
      <div
        className="shadow p-2 mb- bg-white rounded"
        style={{ width: '800px' }}
      >
        <Table
          className="table w-auto small text-center "
          hover
          align="center"
          style={{ fontSize: '14px', width: '500px' }}
        >
          <thead>
            <tr style={{ color: '#482890', fontWeight: 'bold' }}>
              <th>b_id</th>
              <th>Floor_no</th>
              <th>b_space</th>
              <th colSpan={2}>b_name</th>
              <th>Description</th>
              <th>Category_Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {BuildingFloor && BuildingFloor.length > 0
              ? BuildingFloor.map((a) => {
                  return (
                    <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      <td>{a.b_id}</td>
                      <td>{a.floor_no}</td>
                      <td>{a.b_space}</td>
                      <td colSpan={2}>{a.b_name}</td>
                      <td>{a.description}</td>
                      <td>{a.category_id}</td>

                      <td>
                        <FaTrashAlt style={{ color: ' #ff615a ' }} />

                        <FaPen
                          style={{ color: ' #482890', marginLeft: '10px' }}
                        />
                      </td>
                    </tr>
                  )
                })
              : 'No data available'}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default FacilityTable
