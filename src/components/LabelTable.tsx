import React from 'react';
import MaterialTable, { Column, Action } from 'material-table';
import Chip from '@material-ui/core/Chip';

export interface Label {
  id: number;
  name: string;
  color: string;
  user_id: number;
  num_tasks: number;
  num_todos: number;
}

interface LabelTableProps {
  title?: string;
  columns?: Column<Label>[];
  data: Label[];
  actions?: Action<Label>[];
  editable?: {
    isEditable?: (label: Label) => boolean;
    isDeletable?: (label: Label) => boolean;
    onRowAdd?: (newLabel: Label) => Promise<any>;
    onRowUpdate?: (newLabel: Label, oldLabel?: Label) => Promise<any>;
    onRowDelete?: (oldLabel: Label) => Promise<any>;
    editTooltip?: (label: Label) => string;
    deleteTooltip?: (label: Label) => string;
    onRowAddCancelled?: (label: Label) => void;
    onRowUpdateCancelled?: (label: Label) => void;
    isEditHidden?: (label: Label) => boolean;
    isDeleteHidden?: (label: Label) => boolean;
  }
}

const textColor = (bgColor: string) => {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.278) ? "#000000" : "#FFFFFF";
}

export default function LabelTable(props: LabelTableProps) {
  const { columns, data, title, actions, editable } = props;
  const mergedColumns = columns || [
    { 
      title: 'Name', 
      field: 'name', 
      render: label => {
          return (
            <Chip style={{backgroundColor: label.color, color: textColor(label.color), fontWeight: 600, }} label={label.name} />
          );
      }
    },
    { title: 'Created By', field: 'user_id' },
    { title: 'Tasks', field: 'num_tasks', type: 'numeric' },
    { title: 'Todos', field: 'num_todos', type: 'numeric' },
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