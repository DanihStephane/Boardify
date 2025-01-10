import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from './components/Column';
import { TaskCard } from './components/TaskCard';
import { Header } from './components/Header';
import type { Task } from './types';
import { Clock } from 'lucide-react';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implémenter l\'authentification',
    description: 'Ajouter la connexion via email et mot de passe avec support OAuth pour Google et GitHub. Inclure la récupération de mot de passe.',
    status: 'todo',
    priority: 'high',
    assignee: 'Sophie Martin',
    dueDate: '2024-03-25',
    tags: ['auth', 'security', 'frontend'],
    createdAt: '2024-03-15T10:00:00Z',
    estimatedHours: 8,
    comments: [
      {
        id: 'c1',
        author: 'Thomas',
        content: 'N\'oubliez pas d\'ajouter la validation 2FA',
        createdAt: '2024-03-15T14:30:00Z',
      }
    ]
  },
  {
    id: '2',
    title: 'Design de la page d\'accueil',
    description: 'Créer une maquette moderne et responsive avec animations fluides et support mobile',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Lucas Dubois',
    dueDate: '2024-03-20',
    tags: ['design', 'ui/ux', 'responsive'],
    createdAt: '2024-03-14T09:00:00Z',
    estimatedHours: 12,
    comments: [
      {
        id: 'c2',
        author: 'Marie',
        content: 'J\'ai ajouté quelques références dans Figma',
        createdAt: '2024-03-14T16:45:00Z',
      }
    ]
  },
  {
    id: '3',
    title: 'Tests unitaires',
    description: 'Écrire les tests pour les composants principaux avec Jest et React Testing Library',
    status: 'done',
    priority: 'low',
    assignee: 'Emma Bernard',
    dueDate: '2024-03-18',
    tags: ['testing', 'quality'],
    createdAt: '2024-03-13T11:00:00Z',
    completedAt: '2024-03-17T15:30:00Z',
    estimatedHours: 6,
    comments: []
  },
  {
    id: '4',
    title: 'Optimisation des performances',
    description: 'Améliorer le temps de chargement et optimiser les requêtes API',
    status: 'todo',
    priority: 'high',
    assignee: 'Alexandre Petit',
    dueDate: '2024-03-28',
    tags: ['performance', 'optimization'],
    createdAt: '2024-03-16T08:00:00Z',
    estimatedHours: 10,
    comments: []
  }
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overStatus = over.id as Task['status'];

    if (!activeTask) return;

    if (activeTask.status !== overStatus) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === activeTask.id
            ? {
                ...t,
                status: overStatus,
                completedAt: overStatus === 'done' ? new Date().toISOString() : undefined,
              }
            : t
        ),
      );
    }

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    if (oldIndex !== newIndex) {
      setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }

    setActiveTask(null);
  };

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === 'todo'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    done: tasks.filter((t) => t.status === 'done'),
  };

  const totalEstimatedHours = tasks.reduce((acc, task) => acc + (task.estimatedHours || 0), 0);
  const completedTasks = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tableau Kanban</h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{totalEstimatedHours}h estimées</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div>
              {completedTasks} / {tasks.length} tâches terminées
            </div>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-[calc(100vh-16rem)] overflow-hidden">
            <Column status="todo" tasks={tasksByStatus.todo} />
            <Column status="in-progress" tasks={tasksByStatus['in-progress']} />
            <Column status="done" tasks={tasksByStatus.done} />
          </div>
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}