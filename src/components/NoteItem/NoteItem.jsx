import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "./styles";

export const NoteItem = ({ isNew, value, onClick, ...props }) => {
  return (
    <Container $isNew={isNew}>
      <input type="text" value={value} readOnly={!isNew} {...props} />

      <button type="button" onClick={onClick}>
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  );
};
