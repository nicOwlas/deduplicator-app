// src/stories/ImageTable.stories.tsx

import { Meta, Story } from "@storybook/react/types-6-0";
import ImageTable, { ImageTableProps } from "../components/ImageTable";

export default {
  title: "Components/ImageTable",
  component: ImageTable,
} as Meta;

const Template: Story<ImageTableProps> = (args) => <ImageTable {...args} />;

export const Example = Template.bind({});
// src/stories/ImageTable.stories.tsx

// ...

Example.args = {
  data: {
    hash1: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
    ],
    hash2: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
    ],
    hash3: [
      "https://raw.githubusercontent.com/alexcorvi/heic2any/master/demo/10.heic",
    ],
  },
};
