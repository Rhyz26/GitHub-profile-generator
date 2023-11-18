import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import { TextInput, MantineProvider } from "@mantine/core";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    fetchUserData();
  };

  async function fetchUserData() {
    if (!username) {
      return;
    }

    let apiUrl = `https://api.github.com/users/{username}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [username]);

  return (
    <MantineProvider>
      <div>
        <TextInput
          label="Enter GitHub username"
          value={username}
          onChange={handleUsernameChange}
        />

        {userData ? (
          <div>
            {userData.results.map((user) => {
              return (
                <Profile
                  name={`${user.name.first} ${user.name.last}`}
                  picture={user.picture.medium}
                />
              );
            })}
          </div>
        ) : (
          <h1>{error || "Loading..."}</h1>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
