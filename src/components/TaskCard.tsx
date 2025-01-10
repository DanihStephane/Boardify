import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock, GripVertical, MessageSquare, User } from 'lucide-react';
import type { Task } from '../types';
import { cn } from '../utils';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityConfig = {
    low: {
      color: 'bg-blue-100 text-blue-800',
      label: 'Basse',
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800',
      label: 'Moyenne',
    },
    high: {
      color: 'bg-red-100 text-red-800',
      label: 'Haute',
    },
  };

  const formattedDate = new Date(task.dueDate || '').toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white p-4 rounded-xl shadow-sm border border-gray-200',
        'hover:shadow-md transition-all duration-200',
        isDragging && 'opacity-50 shadow-lg scale-105',
      )}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 text-gray-400 hover:text-gray-600 touch-none"
        >
          <GripVertical size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
            <span
              className={cn(
                'shrink-0 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                priorityConfig[task.priority].color,
              )}
            >
              {priorityConfig[task.priority].label}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {task.assignee && (
              <div className="flex items-center gap-1.5">
                <User size={14} />
                <span>{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>
            )}
            {task.estimatedHours && (
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{task.estimatedHours}h</span>
              </div>
            )}
            {task.comments.length > 0 && (
              <div className="flex items-center gap-1.5">
                <MessageSquare size={14} />
                <span>{task.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}