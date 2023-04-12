import React from "react";
import { Container, Row } from "react-bootstrap";
import AgentTable from "../../components/Support/Table/AgentTable";
//import Chatbot from "../../components/Support/Chatbot";
import SupportButton from "../../components/Support/SupportButton";

const Agents: React.FC = () => {
  return (
    <Container>
      <Row>
        <div>
          <SupportButton />
          <br />
          <hr style={{ margin: "0 0 0 250px", color: "blue" }} />
          <AgentTable />
        </div>
      </Row>
      
    </Container>
  );
};

export default Agents;
