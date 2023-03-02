import { Auth_type } from "../schemas/UserSchema";

export interface basicUser {
  name: string;
  password: string;
  email: string;
  profile_picture: string;
  auth_type: Auth_type.basic;
}
