import { Container } from "./styles";

export const Input = ({ icon: Icon, ...props }) => {
  return (
    <Container>
      {Icon && <Icon />}
      <input type="text" {...props} />
    </Container>
  );
};
