import { FiPlus } from "react-icons/fi";
import { Header } from "../../components/Header/Header";
import { ButtonText } from "../../components/ButtonText/ButtonText";
import { Container, Brand, Menu, Search, Content, NewNote } from "./style";
import { Input } from "../../components/Input/Input";
import { Section } from "../../components/Section/Section";
import { Note } from "../../components/Note/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    const alreadySelected = tagsSelected.includes(tagName);
    const isAll = tagName === "all";

    if (isAll) {
      return setTagsSelected([]);
    }

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);

      setTagsSelected(filteredTags);
    } else {
      setTagsSelected([...tagsSelected, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  async function fetchTags() {
    const response = await api.get("/tags");
    setTags(response.data);
  }

  async function fetchNotes() {
    const response = await api.get(
      `/notes?title=${search}&tags=${tagsSelected}`
    );
    setNotes(response.data);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            isActive={tagsSelected.length === 0}
            onClick={() => {
              handleTagSelected("all");
            }}
          />
        </li>

        {tags.map((tag) => (
          <li key={tag.id}>
            <ButtonText
              title={tag.name}
              onClick={() => {
                handleTagSelected(tag.name);
              }}
              isActive={tagsSelected.includes(tag.name)}
            />
          </li>
        ))}
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes.map((note, i) => (
            <Note
              key={String(i)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
};
