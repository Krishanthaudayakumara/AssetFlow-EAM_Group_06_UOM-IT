import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FacilityBarChart from '../../components/Dashboard/FacilityBarChart';
import '../../css/Home.css';
import CardDashboard from '../../components/Dashboard/CardDashboard';
import axios from 'axios';
import LineChart from '../../components/Dashboard/LineChart';
import "./../../css/Table.css";

const FacilityDashboard: React.FC = () => {
  const [totalBuildings, setTotalBuildings] = useState(0);
  const [totalFacilityAssets, setFacilityAssets] = useState(0);
  const [totalWorkstations, setTotalWorkstations] = useState(0);
  const [assetStatusCounts, setAssetStatusCounts] = useState<number[]>([]);
  const [lineChartData, setLineChartData] = useState<any>(null);

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
      .get('http://localhost:5087/FacilityDashboard/workstation-asset-count')
      .then((response) => {
        setLineChartData(response.data);
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
  return (
    <div>
      <Container>
      <h2  className="table-page-heading">FACILITY DASHBOARD</h2>
        <div className="row mb-3" style={{ margin: '0px 0 0 65px' }}>
          <CardDashboard name="Total Buildings" count={totalBuildings} />
          <CardDashboard name="Total Facility Assets" count={totalFacilityAssets} />
          <CardDashboard name="Total workstation" count={totalWorkstations} />
        </div>
        <h4 style={{ margin: '0px 0 0 65px' }}>Workstation Assignment</h4>
        <div>
          <Row>
            <Col md={6}>
              <div
                className="shadow p-4 mb-6 bg-white rounded"
                style={{
                  paddingTop: '100px',
                  height: '450px',
                  margin: '0px 0 0 65px',
                  width: '900px',
                  alignContent: 'center',
                }}
              >
                {lineChartData && (
                  <LineChart
                    Linedata={{
                      labels: lineChartData.map((data: any) => data.workstationId),
                      datasets: [
                        {
                          label: 'Not Assigned',
                          data: lineChartData.map((data: any) => data.notAssignedCount),
                          borderColor: '#482890',
                          backgroundColor: '#482890',
                        },
                        {
                          label: 'Assigned',
                          data: lineChartData.map((data: any) => data.assignedCount),
                          borderColor: '#ff615a',
                          backgroundColor: '#ff615a',
                        },
                      ],
                    }}
                    Lineoptions={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            usePointStyle: true,
                          },
                        },
                        title: {
                          display: true,
                          text: 'Workstation Assignment',
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Workstation ID',
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Count',
                          },
                        },
                      },
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
        <h4 style={{ margin: '0px 0 0 65px' }}>Asset Status</h4>
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




