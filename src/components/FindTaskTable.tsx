import React from 'react';
import TaskTable, { Task } from './TaskTable';

export default function FindTaskTable() {
    const actions = [
      {
        icon: 'playlist_add',
        tooltip: 'Add Task',
        onClick: (event: any, rowData: Task | Task[]) => {

        }
      }
    ]  
    const data = [
      {
        id: 1,
        description: 'Load Dishwasher',
        points: 200,
        user_id: 34,
        labels: [],
      },
      {
        id: 2,
        description: 'Unload Dishwasher',
        points: 200,
        user_id: 34,
        labels: [],
      },
      {
        id: 3,
        description: 'Vaccum Downstairs',
        points: 200,
        user_id: 34,
        labels: [],
      },
      {
        id: 4,
        description: 'Wipe Down Countertop',
        points: 200,
        user_id: 34,
        labels: [],
      },
      {
        id: 6,
        description: 'Swiffer Kitchen Floor',
        points: 200,
        user_id: 34,
        labels: [],
      },
      {
        id: 7,
        description: 'Take Out Trash',
        points: 200,
        user_id: 34,
        labels: [],
      },
    ];

  return <TaskTable data={data} actions={actions} title={"Find Tasks"} />;
}