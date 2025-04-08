import React from "react";
import type { UserData } from "../interfaces/UserData";
// import auth from '../utils/auth';

// Define the props for the component
interface UserListProps {
  users: UserData[] | null; // users can be an array of UserData objects or null
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-grid">
      {users &&
        users.map((user) => (
          <div className="user-container" key={user.id}>
            <div className="user">
              <h3>
                {user.id}. {user.username}
              </h3>
            </div>
            <div className="user-email">
              <h4>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </h4>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserList;
