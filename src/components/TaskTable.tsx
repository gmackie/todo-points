import React from 'react';
import MaterialTable, { Column, Action } from 'material-table';

export interface Task {
  id: number;
  description: string;
  points: number;
  user_id: number;
}

interface TaskTableProps {
  title?: string;
  columns?: Column<Task>[];
  data: Task[];
  actions?: Action<Task>[];
  editable?: {
    isEditable?: (task: Task) => boolean;
    isDeletable?: (task: Task) => boolean;
    onRowAdd?: (newTask: Task) => Promise<any>;
    onRowUpdate?: (newTask: Task, oldTask?: Task) => Promise<any>;
    onRowDelete?: (oldTask: Task) => Promise<any>;
    editTooltip?: (task: Task) => string;
    deleteTooltip?: (task: Task) => string;
    onRowAddCancelled?: (task: Task) => void;
    onRowUpdateCancelled?: (task: Task) => void;
    isEditHidden?: (task: Task) => boolean;
    isDeleteHidden?: (task: Task) => boolean;
  }
}

export default function TaskTable(props: TaskTableProps) {
  const { columns, data, title, actions, editable } = props;
  const mergedColumns = columns || [
    { title: 'Descriptions', field: 'description' },
    { title: 'Points', field: 'points', type: 'numeric' },
  ];

  return (
    <MaterialTable
      title={title}
      columns={mergedColumns}
      data={data}
      actions={actions}
      editable={editable}
      options={{
        selection: true
      }}
    />
  );
}