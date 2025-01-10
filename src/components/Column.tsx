import type { Task, Status } from '../types';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { cn } from '../utils';
import { Plus } from 'lucide-react';

interface ColumnProps {
  status: Status;
  tasks: Task[];
}

const statusConfig = {
  todo: {
    title: 'À faire',
    className: 'bg-gray-50 border-gray-200',
    headerClass: 'text-gray-700',
  },
  'in-progress': {
    title: 'En cours',
    className: 'bg-blue-50 border-blue-200',
    headerClass: 'text-blue-700',
  },
  done: {
    title: 'Terminé',
    className: 'bg-green-50 border-green-200',
    headerClass: 'text-green-700',
  },
};

export function Column({ status, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="flex flex-col flex-1 min-w-[350px] max-w-md h-full">
      <div className={cn(
        'p-4 rounded-t-xl border-x border-t',
        statusConfig[status].className
      )}>
        <div className="flex items-center justify-between">
          <h2 className={cn(
            'font-semibold text-lg',
            statusConfig[status].headerClass
          )}>
            {statusConfig[status].title} ({tasks.length})
          </h2>
          <button
            className={cn(
              'p-1 rounded-md hover:bg-white/50 transition-colors',
              statusConfig[status].headerClass
            )}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-4 overflow-y-auto border-x border-b rounded-b-xl',
          statusConfig[status].className,
        )}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}