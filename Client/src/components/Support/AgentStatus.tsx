import React, { useState } from "react";
import { Badge } from "react-bootstrap";

export default function AgentStatus() {
  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
  };
  return (
    <div>
      <Badge
        onClick={toggle}
        style={{ cursor: "pointer" }}
        className={"bg-success " + (state ? "bg-warning" : "")}
      >
        {state ? "Not Available" : "Available"}
      </Badge>
    </div>
  );
}
