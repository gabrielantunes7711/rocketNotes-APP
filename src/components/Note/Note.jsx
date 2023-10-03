import { Container } from "./styles";
import { Tag } from "../Tag/Tag";

export const Note = ({ data, ...props }) => {
  return (
    <Container {...props}>
      <h1>{data.title}</h1>

      {data.tags && (
        <footer>
          {data.tags.map((tag) => (
            <Tag title={tag.name} key={tag.id} />
          ))}
        </footer>
      )}
    </Container>
  );
};
