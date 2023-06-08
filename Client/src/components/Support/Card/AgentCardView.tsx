import React from "react";
import { Card } from "react-bootstrap";

interface agentType {
  profileImage: string;
  id: number;
  firstName: string;
  lastName: string;
  contact: string;
  position: string;
  email: string;
  joinDate: string;
  teamId: number;
  agentStatus: string;
}

interface AgentCardViewProps {
  agents: agentType[];
  onEditIssue: (agent: agentType) => void;
  onDeleteIssue: (agent: agentType) => void;
}

const AgentCardView = ({
  agents,
  onEditIssue,
  onDeleteIssue,
}: AgentCardViewProps) => {
  return (
    <div className="card-view-wrapper">
    <div className="agent-card-container">
      {agents.map((agent) => (
        <Card key={agent.id} className="agent-card">
            
          <Card.Img
            variant="top"
            src={`http://localhost:5087/ProfileImages/${agent.profileImage}`}
            alt="User profile"
            className=" agent-image"
          />
          <Card.Body>
            <Card.Title className="agent-name">
              {agent.firstName} {agent.lastName}
            </Card.Title>
            
            <div className="agent-actions">
              <button
                className="edit-button"
                onClick={() => onEditIssue(agent)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => onDeleteIssue(agent)}
              >
                Delete
              </button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default AgentCardView;

