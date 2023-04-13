import React from "react";
import { Container, Row, Button, Modal } from "react-bootstrap";
import AgentTable from "../../components/Support/Table/AgentTable";
import NewAgentForm from "../../components/Support/Forms/NewAgentForm";

const Agents: React.FC = () => {
  return (
    <Container>
      <Row>
        <div>          
          <br />
          <hr style={{ margin: "0 0 0 250px", color: "blue" }} />
          <AgentTable />
        </div>
      </Row>
      
    </Container>
  );
};

export default Agents;
