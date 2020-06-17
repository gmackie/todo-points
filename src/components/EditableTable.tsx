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
  const [state, setState] = React.useState<TableState>({
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
  });

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
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}