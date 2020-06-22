import React from 'react';
import MaterialTable, { Column, Action } from 'material-table';

export interface Todo {
  id: number;
  description: string;
  points: number;
  user_id: number;

}

interface TodoTableProps {
  title?: string;
  columns?: Column<Todo>[];
  data: Todo[];
  actions?: Action<Todo>[];
  editable?: {
    isEditable?: (todo: Todo) => boolean;
    isDeletable?: (todo: Todo) => boolean;
    onRowAdd?: (newTodo: Todo) => Promise<any>;
    onRowUpdate?: (newTodo: Todo, oldTodo?: Todo) => Promise<any>;
    onRowDelete?: (oldTodo: Todo) => Promise<any>;
    editTooltip?: (todo: Todo) => string;
    deleteTooltip?: (todo: Todo) => string;
    onRowAddCancelled?: (todo: Todo) => void;
    onRowUpdateCancelled?: (todo: Todo) => void;
    isEditHidden?: (todo: Todo) => boolean;
    isDeleteHidden?: (todo: Todo) => boolean;
  }
}

export default function TodoTable(props: TodoTableProps) {
  const { columns, data, title, actions, editable } = props;
  const mergedColumns = columns || [
    { title: 'Description', field: 'description' },
    { title: 'Points', field: 'points', type: 'numeric' },
  ];
  
  return (
    <MaterialTable
      title={title}
      columns={mergedColumns}
      data={data}
      actions={actions}
      editable={editable}
    />
  );
}