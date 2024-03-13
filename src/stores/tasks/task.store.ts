import { StateCreator, create } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
// import { produce } from 'immer';

interface TaskState {
	tasks: Record<string, Task>;
	draggingTaskId?: string;
}

interface Actions {
	getTasksByStatus: (status: TaskStatus) => Task[];
	addTask: (title: string, status: TaskStatus) => void;
	setDragginTaskId: (taskId: string) => void;
	changeTaskStatus: (taskId: string, status: TaskStatus) => void;
	removeDraggingTaskId: () => void;
	totalTasks: () => number;
}

const taskStore: StateCreator<TaskState & Actions, [['zustand/immer', never]]> = (set, get) => ({
	//State
	tasks: {
		'1': { id: '1', title: 'Task-1', status: 'open' },
		'2': { id: '2', title: 'Task-2', status: 'open' },
		'3': { id: '3', title: 'Task-3', status: 'in-progress' },
		'4': { id: '4', title: 'Task-4', status: 'done' },
	},
	draggingTaskId: undefined,
	//Actions
	getTasksByStatus: (status: TaskStatus) => {
		const tasks = Object.values(get().tasks);
		const filteredTasks = tasks.filter((task) => task.status === status);

		return filteredTasks;
	},
	addTask: (title: string, status: TaskStatus) => {
		const newTask = { id: uuidv4(), title, status };

		//? Sin immer, forma nativa zustand
		// set((state) => ({
		// 	tasks: {
		// 		...state.tasks,
		// 		[newTask.id]: newTask,
		// 	},
		// }));

		//? Con immer, requiere instalarla como dependencia "yarn add immer"
		// set(
		// 	produce((state: TaskState) => {
		// 		state.tasks[newTask.id] = newTask;
		// 	}),
		// );

		//? Con immer como middleware de zustand
		set((state) => {
			state.tasks[newTask.id] = newTask;
		});
	},
	setDragginTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
	changeTaskStatus: (taskId: string, status: TaskStatus) => {
		set((state) => {
			state.tasks[taskId].status = status;
			return state;
		});
	},
	removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
	totalTasks: () => Object.keys(get().tasks).length,
});

export const useTaskStore = create<TaskState & Actions>()(
	devtools(
		persist(immer(taskStore), {
			name: 'task-storage',
		}),
	),
);

/*
    La libreria immer nos permite escribir codigo mutante, es decir mutar valores no primitivos
     y que react se entere de que hubo un cambio en el estado.
*/
