import React from "react";

interface ProfilePictureProps {
  name: string;
  fontSize?: number;
}

const DefaultProfilePicture = ({ name, fontSize = 38 }: ProfilePictureProps) => {
  const initials = name.charAt(0);

  return (
    <div className="default-profile-picture">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#cfcfcf" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy="0.35em"
          fill="#555555"
          fontFamily="sans-serif"
          fontWeight="bold"
          fontSize={fontSize}
        >
          {initials}
        </text>
      </svg>
    </div>
  );
};

export default DefaultProfilePicture;
