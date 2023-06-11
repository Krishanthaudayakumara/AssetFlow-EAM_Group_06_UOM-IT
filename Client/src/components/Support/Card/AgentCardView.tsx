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
  search: string;
  currentPage: number;
  recordsPerPage: number;
  onEditIssue: (agent: agentType) => void;
  onDeleteIssue: (agent: agentType) => void;
  onAgentClick: (agent: agentType) => void;
}

const AgentCardView = ({
  agents,
  search,
  currentPage,
  recordsPerPage,
  onEditIssue,
  onDeleteIssue,
  onAgentClick,
}: AgentCardViewProps) => {
  return (
    <div className="card-view-wrapper">
      <div className="agent-card-container">
        {agents
          .filter((agent) => {
            return search.toLowerCase() === ""
              ? agent
              : agent.firstName.toLowerCase().includes(search);
          })
          .slice(
            (currentPage - 1) * recordsPerPage,
            currentPage * recordsPerPage
          )
          .map((agent) => (
            <Card key={agent.id} className="agent-card">
              <Card.Img
                variant="top"
                src={`http://localhost:5087/ProfileImages/${agent.profileImage}`}
                alt="User profile"
                className=" agent-image"
                onClick={() => onAgentClick(agent)}
                style={{ cursor: "pointer" }}
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
