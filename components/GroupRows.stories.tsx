// stories/GroupRow.stories.tsx
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import GroupRow, { GroupRowProps } from "../components/GroupRow";

export default {
  title: "Components/GroupRow",
  component: GroupRow,
} as Meta;

const Template: Story<GroupRowProps> = (args) => (
  <Table>
    <Thead>
      <Tr>
        <Th>Row Index</Th>
        <Th>Image Thumbnail</Th>
        <Th>Image Path</Th>
      </Tr>
    </Thead>
    <Tbody>
      <GroupRow {...args} />
    </Tbody>
  </Table>
);

export const Default = Template.bind({});
Default.args = {
  hash: "sample-hash",
};
