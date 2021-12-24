import axios from "axios";

export async function getUUIDFromUsername(username: string) {
  const response = await axios.get(`/api/usernameLookup?username=${username}`);
  const json = await response.data;
  return json.uuid;
}
