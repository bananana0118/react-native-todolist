export type Todo = {
    id: string;
    date: string;
    task: string;
    completed?: boolean;
    priority?: string;
    notes?: string;
};

export type TodoTable = {
    id: string;
    date: string;
    todos: Todo[];
};
