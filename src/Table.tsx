import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { type User, getUsers, setSearchQuery } from "./usersSlice";
import { useEffect } from "react";

type SearchQuery = {
  [key in keyof User]?: string;
};

const Table = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, searchQuery } = useSelector(
    (state: RootState) => state.users
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setSearchQuery({
        ...searchQuery,
        [e.target.name]: e.target.value,
      })
    );
  };

  const matchesSearchQuery = (user: User, searchQuery: SearchQuery) =>
    (Object.keys(searchQuery) as (keyof User)[]).every((key) =>
      user[key]
        .toString()
        .toLowerCase()
        .includes(searchQuery[key]?.toLowerCase() || "")
    );

  const filteredUsers = users.filter((user) =>
    matchesSearchQuery(user, searchQuery)
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="main-container">
      <div className="search-container">
        <div className="serach-name-container">
          <input
            className="sort-button"
            type="text"
            name="name"
            autoComplete="off"
            placeholder=" "
            value={searchQuery.name}
            onChange={handleSearch}
          />
          <label className="input-name">Search by name</label>
        </div>
        <div className="serach-username-container">
          <input
            className="sort-button"
            type="text"
            name="username"
            autoComplete="off"
            placeholder=" "
            value={searchQuery.username}
            onChange={handleSearch}
          />
          <label className="input-username">Search by username</label>
        </div>
        <div className="serach-email-container">
          <input
            className="sort-button"
            type="text"
            name="email"
            autoComplete="off"
            placeholder=" "
            value={searchQuery.email}
            onChange={handleSearch}
          />
          <label className="input-email">Search by email</label>
        </div>
        <div className="serach-phone-container">
          <input
            className="sort-button"
            type="text"
            name="phone"
            autoComplete="off"
            placeholder=" "
            value={searchQuery.phone}
            onChange={handleSearch}
          />
          <label className="input-phone">Search by phone</label>
        </div>
      </div>
      {status === "loading" && (
        <p style={{ fontSize: "32px", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </p>
      )}
      {status === "succeeded" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {filteredUsers.length === 0 && status !== "loading" && (
        <p style={{ fontSize: "32px", textAlign: "center", marginTop: "20px" }}>
          Not Found
        </p>
      )}
    </div>
  );
};

export default Table;
