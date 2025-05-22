export interface Task {
  id: number;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
}

let tasks: Task[] = [];

export const addTask = (task: Task) => {
  tasks.push(task);
};

export const getTasks = () => tasks;
