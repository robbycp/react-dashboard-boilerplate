import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { rows } from '../../dataMock/dataTables'

import Table from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Table',
  component: Table,
  argTypes: {
    maxWidth: {
      control: {
        type: 'select'
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  }
} as ComponentMeta<typeof Table>;

const headCells = [
  {
    id: 'name',
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    label: 'Calories',
  },
  {
    id: 'fat',
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    label: 'Protein (g)',
  },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => (
  <Table rows={rows} columnKey="name" {...args} />
)

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  tableTitle: "Nutrition Table",
  headOptions: headCells,
  rowsPerPageOptions: [10, 20, 50, 100],
};

export const WithCheckbox = Template.bind({});
WithCheckbox.args = {
  ...Default.args,
  checkboxOptions: {
    bulkOptions: [
      {
        label: 'Delete All',
        onClick: (selected: unknown[]) => {
          console.log('delete all', selected)
        },
      },
      {
        label: 'Export',
        onClick: (selected: unknown[]) => {
          console.log('export data', selected)
        },
      },
    ],
    onSelect: (rowId: unknown) => {
      console.log('select', rowId)
    }
  }
}
export const WithAction = Template.bind({});

WithAction.args = {
  ...Default.args,
  rowActionOptions: [
    {
      label: 'View Detail',
      onClick: (rowId: unknown) => {
        console.log(`/table/${rowId}`)
      }
    },
    {
      label: 'Delete',
      onClick: (rowId: unknown) => {
        console.log('delete', rowId)
      }
    },
  ]
}
