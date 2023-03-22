import { Meta, Story } from "@storybook/react";
import ImageThumbnail, { ImageThumbnailProps } from "./ImageThumbnail";

export default {
  title: "Components/ImageThumbnail",
  component: ImageThumbnail,
} as Meta;

const Template: Story<ImageThumbnailProps> = (args) => (
  <ImageThumbnail {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
  alt: "An example image",
  width: 200,
  height: 200,
};

export const Heic = Template.bind({});
Heic.args = {
  src: "https://github.com/alexcorvi/heic2any/blob/master/demo/10.heic",
  alt: "An example image",
  width: 100,
  height: 100,
};
