import Container from "./style";

export const Button = ({ label, loading = false, ...props }) => {
  return (
    <Container type="button" disabled={loading} {...props}>
      {loading ? "Carregando..." : label}
    </Container>
  );
};
