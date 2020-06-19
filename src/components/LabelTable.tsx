import React from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  description: string;
  created_by: number;
  num_tasks: number;
  num_todos: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function LabelTable() {
  const state: TableState = {
    columns: [
      { 
        title: 'Name',
        field: 'description',
        render: rowData => <
      },
      { title: 'Created By', field: 'created_by' },
      { title: 'Tasks', field: 'num_tasks', type: 'numeric' },
      { title: 'Todos', field: 'num_todos', type: 'numeric' },
    ],
    data: [
      {
        description: 'Load Dishwasher',
        created_by: 1,
        num_tasks: 156,
        num_todos: 123,
      },
    ],
  };

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: 'remove_circle',
          tooltip: 'Delete Label',
          onClick: (event, rowData) => {

          }
        }
      ]}
    />
  );
}