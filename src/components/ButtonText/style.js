import styled from "styled-components";

const Container = styled.button`
  background: none;
  color: ${({ theme, $isActive }) =>
    $isActive === "true" ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  border: none;
  font-size: 16px;
`;

export default Container;
