import { Container } from "./styles";

export const Textarea = ({ value, ...props }) => {
  return <Container {...props}>{value}</Container>;
};
