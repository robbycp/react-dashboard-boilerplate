import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonLoading from './loading';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ButtonLoading',
  component: ButtonLoading,
} as ComponentMeta<typeof ButtonLoading>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonLoading> = (args) => <ButtonLoading autoFocus variant="contained" {...args}>Submit</ButtonLoading>

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  loading: false,
};
