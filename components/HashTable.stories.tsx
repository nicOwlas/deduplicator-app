// src/stories/Hash.stories.tsx

import { Meta, Story } from "@storybook/react/types-6-0";
import HashTable, { HashTableProps } from "./HashTable";

export default {
  title: "Components/HashTable",
  component: HashTable,
} as Meta;

const Template: Story<HashTableProps> = (args) => <HashTable {...args} />;

export const Example = Template.bind({});

Example.args = {
  data: {
    "0000000000000000000000000000000000000000000000000000000000000000": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
    ],
    "000100020000000000000000000407000000d3cc5898b0e1b1c038b8240862a0": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
    ],
    ffffffff7bfef5fee6ec27b188a38689e1627b723961fce38c602d2cae0c0864: [
      "https://raw.githubusercontent.com/alexcorvi/heic2any/master/demo/10.heic",
    ],
  },
};
