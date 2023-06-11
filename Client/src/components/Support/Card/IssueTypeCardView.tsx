import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../../css/Support/Support.css";

interface issueType {
  id: number;
  name: string;
}

interface IssueTypeCardViewProps {
  issues: issueType[];
  search: string;
  currentPage: number;
  recordsPerPage: number;
  onEditIssue: (issue: issueType) => void;
  onDeleteIssue: (issue: issueType) => void;
}

const IssueTypeCardView = ({
  issues,
  search,
  currentPage,
  recordsPerPage,
  onEditIssue,
  onDeleteIssue,
}: IssueTypeCardViewProps) => {
  return (
    <div className="card-view-wrapper">
      {issues
        .filter((issue) => {
          return search.toLowerCase() === ""
            ? issue
            : issue.name.toLowerCase().includes(search);
        })
        .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
        .map((issue) => (
          <Card key={issue.id} className="card-item">
            <Card.Body>
              <Card.Title>{issue.name}</Card.Title>
              <div className="card-button-group">
                <Button variant="primary" onClick={() => onEditIssue(issue)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDeleteIssue(issue)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default IssueTypeCardView;
