import { Container, Form } from "./styles";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/Textarea/Textarea";
import { NoteItem } from "../../components/NoteItem/NoteItem";
import { Section } from "../../components/Section/Section";
import { Button } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

export const New = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleAddLink() {
    if (newLink === "") return;
    setLinks([...links, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTags() {
    if (newTag === "") return;
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título da nota");
    }

    if (newLink) {
      return alert(
        "Você deixou um link no campo para adicionar, mas não salvou."
      );
    }

    if (newTag) {
      return alert(
        "Você deixou uma tag no campo para adicionar, mas não salvou."
      );
    }

    try {
      api.post("/notes", {
        title,
        description,
        tags,
        links,
      });
      alert("Nota criada com sucesso!");
      navigate(-1);
    } catch (error) {
      if (error) {
        alert(error.data);
      }
    }
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to={-1}>Voltar</Link>
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            <NoteItem
              isNew
              placeholder="Novo Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />

            {links.map((link, i) => (
              <NoteItem
                key={i}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
          </Section>

          <Section title="Marcadores">
            <div className="tags-wrapper">
              <NoteItem
                isNew
                placeholder="Nova Tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTags}
              />

              {tags.map((tag, i) => (
                <NoteItem
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                  key={i}
                />
              ))}
            </div>
          </Section>

          <Button label="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
};
