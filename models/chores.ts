export interface Chores {
  id: number;  
  title: string;
  description: string;
  assignedTo: string;
}

export const getChores = () => {
    return [
        { id: 1, title: "Dishes", description: "Wash the dishes after dinner", assignedTo: "John" },
        { id: 2, title: "Laundry", description: "Do the laundry on weekends", assignedTo: "Jane" },
    ];
};