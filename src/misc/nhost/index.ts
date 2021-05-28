import { createClient } from "nhost-js-sdk";
import { BACKEND_ENDPOINT } from "misc";

const client = createClient({
  baseURL: BACKEND_ENDPOINT,
});

const auth = client.auth;
const storage = client.storage;

export { auth, storage };
