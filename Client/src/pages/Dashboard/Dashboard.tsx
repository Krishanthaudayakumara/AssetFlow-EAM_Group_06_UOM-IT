import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {
  faBox,
  faTicket,
  faUser,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import PieChart from '../../components/Dashboard/PieChart';
import LineChart from '../../components/Dashboard/LineChart';
import Card from '../../components/Dashboard/Card';
import '../../css/Home.css';
import axios from 'axios';
import FeedBackBarChart from '../../components/Dashboard/FeedBackBarChart';

interface Employee {
  id: number;
  username: string;
  role: string;
  department: string;
  email: string;
  hireDate: string;
}

interface FeedbackChartData {
  goodCount: number;
  betterCount: number;
  worstCount: number;
}
interface FacilityStatusDTO {
  newCount: number;
  useCount: number;
  damageCount: number;
}


interface SubCategoryTypeDTO {
  subCategoryType: string;
  count: number;
}



const Dashboard: React.FC = () => {
  const [availableEmployeeCount, setAvailableEmployeeCount] = useState<number>(0);
  const [availableAgentCount, setAvailableAgentCount] = useState<number>(0);
  const [totalWorkstations, setTotalWorkstations] = useState(0);
  const [totalFacilityAssets, setFacilityAssets] = useState(0);
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [feedbackChartData, setFeedbackChartData] = useState<FeedbackChartData | null>(null);
  const [facilityStatusData, setFacilityStatusData] = useState<FacilityStatusDTO | null>(null);
  const [subcategoryTypes, setSubcategoryTypes] = useState<SubCategoryTypeDTO[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:5087/MainDashboard/availableEmployeeCount')
      .then((response) => {
        setAvailableEmployeeCount(response.data.availableEmployeeCount);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('http://localhost:5087/ITDashboard/available-agent-count')
      .then((response) => {
        setAvailableAgentCount(response.data.availableAgentCount);
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
      .get('http://localhost:5087/FacilityDashboard/total-facility-assets')
      .then((response) => {
        setFacilityAssets(response.data.totalFacilityAssets);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('http://localhost:5087/MainDashboard/employee-table')
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('http://localhost:5087/MainDashboard/chartFeedback')
      .then((response) => {
        setFeedbackChartData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      axios
      .get('http://localhost:5087/FacilityDashboard/asset-status')
      .then((response) => {
        setFacilityStatusData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      axios
      .get('http://localhost:5087/MainDashboard/subcategory-types')
      .then((response) => {
        setSubcategoryTypes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Container>
        {/* code for Card component */}
        <div className="row mb-3" style={{ margin: '0px 0 0 0px' }}>
          <Card name="Available Employees" quantity={availableEmployeeCount} icon={faUser} />
          <Card name="Available Agents" quantity={availableAgentCount} icon={faBox} />
          <Card name="Total Workstation" quantity={totalWorkstations} icon={faWarehouse} />
          <Card name="Total Facility Assets" quantity={totalFacilityAssets} icon={faTicket} />
        </div>
       

       
   
        <div>
          <Row>
            <Col md={6}>
              <div
                className="shadow p-1 mb-2 bg-white rounded"
                style={{
                  paddingTop: '500px',
                  height: '470px',
                  margin: '0px 0 0 0px',
                  alignContent: 'center',
                }}
              >
                <h2>SubCategory Types</h2>
                {/* code for LineChart component */}
                {subcategoryTypes.length > 0 && (
                  <LineChart
                    Linedata={{
                      labels: subcategoryTypes.map((subcategory) => subcategory.subCategoryType),
                      datasets: [
                        {
                          label: 'Inventory subCategory Types',
                          data: subcategoryTypes.map((subcategory) => subcategory.count),
                          borderColor: '#ff615a',
                          backgroundColor: '#ff615a',
                        },
                      ],
                    }}
                    Lineoptions={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Subcategory Types',
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
            <Col md={6}>
              <div
                className="shadow p-2 mb-5 bg-white rounded"
                style={{
                  height: '470px',
                  
                }}
              >
                <h2>Asset  Status</h2>
                {/* code for PieChart component */}
                {facilityStatusData && (
                  <PieChart
                    data={{
                      labels: ['New', 'Use', 'Damage'],
                      datasets: [
                        {
                          label: 'Asset Status',
                          data: [
                            facilityStatusData.newCount,
                            facilityStatusData.useCount,
                            facilityStatusData.damageCount,
                          ],
                          backgroundColor: ['#482890', '#ff615a', '#632c65'],
                          borderColor: ['#482890', '#ff615a', '#632c65'],
                        },
                      ],
                    }}
                    
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ margin: '0px 2px 2px 0px' }}
        >
          {/* code for BarChart component */}
          <h2>Ticket Feedback Status</h2>
          <FeedBackBarChart
            data={{
              labels: ['Good', 'Better', 'Worst'],
              datasets: [
                {
                  label: 'count',
                  data: [
                    feedbackChartData?.goodCount || 0,
                    feedbackChartData?.betterCount || 0,
                    feedbackChartData?.worstCount || 0,
                  ],
                  backgroundColor: ['#482890', '#ff615a', '#3cba9f'],
                  barThickness: 40,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Feedback Status',
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
        </div>
        <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: '30px 0 0 0px' }}
      >
          <Table className="table w-100 small table-borderless table-responsiv align-middle align-left"
          hover
          style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Join date</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.username}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>{employee.hireDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;


