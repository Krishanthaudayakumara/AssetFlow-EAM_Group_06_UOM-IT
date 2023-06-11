import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FacilityBarChart from '../../components/Dashboard/FacilityBarChart';
import '../../css/Home.css';
import CardDashboard from '../../components/Dashboard/CardDashboard';
import axios from 'axios';
import PieChart from '../../components/Dashboard/PieChart';

import LineChart from '../../components/Dashboard/LineChart';
import "./../../css/Table.css";

const FacilityDashboard: React.FC = () => {
  const [totalBuildings, setTotalBuildings] = useState(0);
  const [totalFacilityAssets, setFacilityAssets] = useState(0);
  const [totalWorkstations, setTotalWorkstations] = useState(0);
  const [assetStatusCounts, setAssetStatusCounts] = useState<number[]>([]);
  const [assignCount, setAssignCount] = useState(0);
  const [notAssignCount, setNotAssignCount] = useState(0);
 

  useEffect(() => {
    axios
      .get('http://localhost:5087/FacilityDashboard/total-buildings')
      .then((response) => {
        setTotalBuildings(response.data.totalBuildings);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('http://localhost:5087/FacilityDashboard/total-facility-assets')
      .then((response) => {
        setFacilityAssets(response.data.totalFacilityAssets);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('http://localhost:5087/FacilityDashboard/total-workstations')
      .then((response) => {
        setTotalWorkstations(response.data.totalWorkstations);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:5087/FacilityDashboard/asset-status')
      .then((response) => {
        setAssetStatusCounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      axios
      .get('http://localhost:5087/FacilityDashboard')
      .then((response) => {
        const assignData = response.data.find((item: any) => item.assignmentStatus === 'Assign');
        const notAssignData = response.data.find((item: any) => item.assignmentStatus === 'Not Assign');

        if (assignData) {
          setAssignCount(assignData.count);
        }

        if (notAssignData) {
          setNotAssignCount(notAssignData.count);
        }
      })
      .catch((error) => {
        console.error(error);
      });
   
  }, []);

 
  const options={
    scales: {
      x: {
        title: {
          display: true,
          text: 'Asset Status',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  }
  const pieChartData = {
    labels: ['Assign', 'Not Assign'],
    datasets: [
      {
        label: 'Asset Status Counts',
        data: [assignCount, notAssignCount],
        backgroundColor: ['#482890', '#ff615a'],
        borderColor: ['#482890', '#ff615a'],
      },
    ],
  };

  return (
    <div>
      <Container>
      <h2  className="table-page-heading">FACILITY DASHBOARD</h2>
        <div className="row mb-3" style={{ margin: '0px 0 0 65px' }}>
          <CardDashboard name="Total Buildings" count={totalBuildings} />
          <CardDashboard name="Total Facility Assets" count={totalFacilityAssets} />
          <CardDashboard name="Total workstation" count={totalWorkstations} />
        </div>
        <h2 style={{ margin: '0px 0 0 65px' }}>Asset Assignment</h2>
        <div>
          <Row>
            <Col md={6}>
            <div  className="shadow p-2 mb-6 bg-white rounded" style={{ margin: '0px 2px 2px 300px', width: '500px', height: '350px', alignContent: 'center' }}>
                   <PieChart
      data={{
      labels: ['Assign', 'Not Assign'],
      datasets: [
        {
          label: 'Asset Status Counts',
          data: [assignCount, notAssignCount],
          backgroundColor: ['#482890', '#ff615a'],
          borderColor: ['#482890', '#ff615a'],
        },
      ],
    }}
  />
              </div>
            </Col>
          </Row>
        </div>
        <h2 style={{ margin: '0px 0 0 65px' }}>Asset Status</h2>
        <div
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ margin: '0px 2px 2px 65px' }}
        >
          <FacilityBarChart
            data={{
              labels: [],
              datasets: [
                {
                  label: 'Asset Status Counts',
                  data: assetStatusCounts,
                  backgroundColor: ['#482890', '#ff615a', '#632c65'],
                  barThickness: 50,
                },
              ],
            }}
            options={options}
          />
        </div>
      </Container>
    </div>
  );
};

export default FacilityDashboard;




