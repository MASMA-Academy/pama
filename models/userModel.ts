export interface User {
  id: number;
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  role: string;
}

let users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const getUsers = () => users;
