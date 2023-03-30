// .storybook/preview.js
import "../styles/components.css";
import { withChakra } from "./withChakra";

export const decorators = [withChakra];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
