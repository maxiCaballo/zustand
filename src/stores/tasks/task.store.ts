import { StateCreator, create } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

interface TaskState {
	tasks: Record<string, Task>;
}

interface Actions {
	getTasksByStatus: (status: TaskStatus) => Task[];
}

const taskStore: StateCreator<TaskState & Actions> = (set, get) => ({
	tasks: {
		'1': { id: '1', title: 'Task-1', status: 'open' },
		'2': { id: '2', title: 'Task-2', status: 'open' },
		'3': { id: '3', title: 'Task-3', status: 'in-progress' },
		'4': { id: '4', title: 'Task-4', status: 'done' },
	},
	getTasksByStatus: (status: TaskStatus) => {
		const tasks = Object.values(get().tasks);
		const filteredTasks = tasks.filter((task) => task.status === status);

		return filteredTasks;
	},
});

export const useTaskStore = create<TaskState & Actions>()(devtools(taskStore));
