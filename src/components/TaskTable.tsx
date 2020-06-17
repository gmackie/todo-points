import React from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  description: string;
  points: number;
  user_id: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function Table() {
  const state: TableState = {
    columns: [
      { title: 'Descriptions', field: 'description' },
      { title: 'Points', field: 'points', type: 'numeric' },
    ],
    data: [
      {
        description: 'Load Dishwasher',
        points: 200,
        user_id: 34
      },
      {
        description: 'Unload Dishwasher',
        points: 200,
        user_id: 34
      },
      {
        description: 'Vaccum Downstairs',
        points: 200,
        user_id: 34
      },
      {
        description: 'Wipe Down Countertop',
        points: 200,
        user_id: 34
      },
      {
        description: 'Swiffer Kitchen Floor',
        points: 200,
        user_id: 34
      },
      {
        description: 'Take Out Trash',
        points: 200,
        user_id: 34
      },
    ],
  };

  return (
    <MaterialTable
      title="Tasks for User"
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: 'check',
          tooltip: 'Complete Task',
          onClick: (event, rowData) => {

          }
        }
      ]}
    />
  );
}