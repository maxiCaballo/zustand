import { DragEvent, useState } from 'react';
import { useTaskStore } from '../stores';
import Swal from 'sweetalert2';
import { TaskStatus } from '../interfaces';

interface Options {
	status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
	//Tasks
	const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);
	const addTask = useTaskStore((state) => state.addTask);
	//Drag
	const draggingTaskId = useTaskStore((state) => state.draggingTaskId);
	const isDragging = useTaskStore((state) => !!state.draggingTaskId);
	const [onDragOver, setOnDragOver] = useState(false);

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(true);
	};
	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(false);
	};
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		changeTaskStatus(draggingTaskId!, status);
		setOnDragOver(false);
	};

	const handleAddTask = async () => {
		const { isConfirmed, value: inputValue } = await Swal.fire({
			title: 'Nueva tarea',
			input: 'text',
			inputLabel: 'Nombre de la tarea',
			inputPlaceholder: 'Ingrese el nombre de la tarea',
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return 'Debe ingresar un nombre para la tarea';
				}
			},
		});

		if (!isConfirmed) {
			return;
		}

		addTask(inputValue, status);
	};
	return {
		//Properties
		isDragging,
		//Methods
		onDragOver,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleAddTask,
	};
};
