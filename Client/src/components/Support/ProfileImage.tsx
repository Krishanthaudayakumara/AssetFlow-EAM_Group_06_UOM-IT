import React, { useState } from "react";
import axios from "axios";

interface ProfileImageProps {
  onSubmit: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        await axios.post("/api/profile-image", formData);
        onSubmit();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="profile-image">Choose a profile image:</label>
      <input
        id="profile-image"
        name="profile-image"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileImage;
