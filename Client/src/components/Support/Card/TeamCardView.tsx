import React from "react";
import { Card } from "react-bootstrap";

interface teamType {
    profileImage: string;
    id: number;
    name: string;
    description: string;
    issueTypeId: number;
  }

interface TeamCardViewProps {
  teams: teamType[];
  onEditIssue: (agent: teamType) => void;
  onDeleteIssue: (agent: teamType) => void;
}

const TeamCardView = ({
  teams,
  onEditIssue,
  onDeleteIssue,
}: TeamCardViewProps) => {
  return (
    <div className="card-view-wrapper">
    <div className="agent-card-container">
      {teams.map((team) => (
        <Card key={team.id} className="agent-card">
            
          <Card.Img
            variant="top"
            src={`http://localhost:5087/ProfileImages/${team.profileImage}`}
            alt="User profile"
            className=" agent-image"
            onClick={() => onEditIssue(team)}
          />
          <Card.Body>
            <Card.Title className="agent-name">
              {team.name}
            </Card.Title>
            
            <div className="agent-actions">
              <button
                className="edit-button"
                onClick={() => onEditIssue(team)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => onDeleteIssue(team)}
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

export default TeamCardView;
