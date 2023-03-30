import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";

export const withChakra = (StoryFn: Function) => {
  return (
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  );
};
