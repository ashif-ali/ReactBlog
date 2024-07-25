// Types and Interfaces

interface Person {
  name?: string;
  email: string;
  password: string;
}

interface Blog {
  isUser?: boolean;
  user?: {name: string; _id: string};
  _id?: string;
  title: string;
  description: string;
  image: string;
}
