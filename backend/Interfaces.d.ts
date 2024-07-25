// Types end Interfaces

import {Document} from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  blogs: string[] | string | [] | null;
}

export interface Blog extends Document {
  title: string;
  description: string;
  image: string;
  user: User;
}
