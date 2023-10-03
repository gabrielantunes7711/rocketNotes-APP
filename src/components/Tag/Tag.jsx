import Container from "./style";

export const Tag = ({ title, ...props }) => {
  return <Container {...props}>{title}</Container>;
};
