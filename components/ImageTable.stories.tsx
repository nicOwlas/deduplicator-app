// src/stories/ImageTable.stories.tsx

import { Meta, Story } from "@storybook/react/types-6-0";
import ImageTable, { ImageTableProps } from "../components/ImageTable";

export default {
  title: "Components/ImageTable",
  component: ImageTable,
} as Meta;

const Template: Story<ImageTableProps> = (args) => <ImageTable {...args} />;

export const Example = Template.bind({});
Example.args = {
  images: [
    {
      id: 1,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      path: "/path/to/image1",
      hash: "hash1",
    },
    {
      id: 2,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      path: "/path/to/image2",
      hash: "hash1",
    },
    {
      id: 3,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      path: "/path/to/image3",
      hash: "hash1",
    },
    {
      id: 4,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
      path: "/path/to/image4",
      hash: "hash1",
    },
    {
      id: 1,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      path: "/path/to/image1",
      hash: "hash2",
    },
    {
      id: 2,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      path: "/path/to/image1",
      hash: "hash2",
    },
    {
      id: 3,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      path: "/path/to/image1",
      hash: "hash2",
    },
    {
      id: 4,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg/2880px-Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
      path: "/path/to/image1",
      hash: "hash2",
    },
  ],
};
