export interface Task {
  id: number;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  parent_id: number;       
}

let tasks: Task[] = [];

// Add a new task
export const addTask = (task: Task) => {
  tasks.push(task);
};

// Get all tasks
export const getTasks = () => tasks;

export const getTasksByParent = (parentId: number) =>
  tasks.filter(task => task.parent_id === parentId);

export const getTaskById = (id: number) =>
  tasks.find(task => task.id === id);

// Update a task
export const updateTask = (id: number, updatedFields: Partial<Task>) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedFields };
    return tasks[index];
  }
  return null;
};

// Delete a task
export const deleteTask = (id: number) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    return tasks.splice(index, 1)[0];
  }
  return null;
};
