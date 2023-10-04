import React from "react";
import { Container } from "./styles";
import { MetroSpinner } from "react-spinners-kit";

export const Loading = () => {
  return (
    <Container>
      <MetroSpinner size={60} color="#FF9000" />
    </Container>
  );
};
