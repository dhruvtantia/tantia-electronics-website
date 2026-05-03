import { apiRequest } from "./api";

export async function submitEnquiry(payload) {
  return apiRequest("/enquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
