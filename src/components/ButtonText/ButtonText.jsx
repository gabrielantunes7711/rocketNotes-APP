import Container from "./style";

export const ButtonText = ({ title, isActive = false, ...props }) => {
  return (
    <Container type="button" $isActive={isActive.toString()} {...props}>
      {title}
    </Container>
  );
};
