import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifyTeamDrive",
  access: (allow) => ({
    "profile-pictures/{entity_id}/*": [
      // allow.guest.to(["read"]), // allow guest to read profile pictures
      allow.entity("identity").to(["read", "write", "delete"]), // allow the user to read, write, and delete their own profile picture
    ],
    "picture-submissions/*": [
      allow.authenticated.to(["read", "write"]),
      allow.guest.to(["read", "write"]),
    ],
    "audio-recordings/*": [
      allow.authenticated.to(["read", "write"]),
      allow.guest.to(["read", "write"]),
    ],
  }),
});
