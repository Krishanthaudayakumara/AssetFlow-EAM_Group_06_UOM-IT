import React from "react";
import TeamToTicket from "../../components/Support/Table/TeamToTicket";

interface Props {
  teamId: number; // Use number type for team ID in the URL
}

const TeamToTicketPage: React.FC<Props> = ({ teamId }) => {
  return <TeamToTicket teamId={teamId} />;
};

export default TeamToTicketPage;
