import { Auth_type } from "../schemas/UserSchema";

export interface googleUser {
  name: string;
  id_token: string;
  email: string;
  profile_picture: string;
  auth_type: Auth_type.google;
}
