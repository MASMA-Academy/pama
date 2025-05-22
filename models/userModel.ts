export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

let users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const getUsers = () => users;
