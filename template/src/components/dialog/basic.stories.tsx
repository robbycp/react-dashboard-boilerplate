import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DialogBasic from './basic';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/DialogBasic',
  component: DialogBasic,
  argTypes: {
    maxWidth: {
      control: {
        type: 'select'
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  }
} as ComponentMeta<typeof DialogBasic>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DialogBasic> = (args) => (
  <DialogBasic {...args}>
    <div>Content</div>
  </DialogBasic>
)

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  isOpen: true,
  isLoadingConfirmButton: false,
  isFullWidth: false,
  maxWidth: 'md',
  textButtonCancel: 'Cancel',
  textButtonConfirm: 'Confirm',
  title: 'Modal Title',
};
