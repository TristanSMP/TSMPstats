import axios from "axios";

export async function getUUIDFromUsername(username: string) {
  const response = await axios.get(
    `http://localhost:3000/api/usernameLookup?username=${username}`
  );
  const json = await response.data;
  return json.uuid;
}
