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
  src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Panorama_of_the_courtyard_of_the_Great_Mosque_of_Kairouan.jpg",
  alt: "An example image",
  width: 200,
  height: 200,
};

export const Heic = Template.bind({});
Heic.args = {
  src: "https://raw.githubusercontent.com/alexcorvi/heic2any/master/demo/10.heic",
  alt: "An example image",
  width: 100,
  height: 100,
};
