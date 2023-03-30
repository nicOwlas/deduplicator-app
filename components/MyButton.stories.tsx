// components/MyButton.stories.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react/types-6-0";
import MyButton from "./MyButton";

export default {
  title: "Components/MyButton",
  component: MyButton,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
} as Meta;

const Template: Story = (args) => <MyButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
