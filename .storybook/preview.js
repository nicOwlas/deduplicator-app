// .storybook/preview.js
import "../styles/components.css";
import { withChakra } from "./withChakra";

import * as nextRouter from "next/router";

// Import the Next.js Router mock
import useRouterMock from "./next-router-mock";

nextRouter.useRouter = useRouterMock;

export const decorators = [withChakra];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
