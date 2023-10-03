import { Tag } from "../../components/Tag/Tag";
import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import { Section } from "../../components/Section/Section";
import { ButtonText } from "../../components/ButtonText/ButtonText";
import Container from "./styles";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  async function fetchNote() {
    const response = await api.get(`/notes/${params.id}`);

    setData(response.data);
  }

  async function handleDeleteNote() {
    const confirm = window.confirm("Você deseja excluir esta nota?");

    if (!confirm) return;

    await api.delete(`/notes/${params.id}`);
    navigate(-1);
  }

  useEffect(() => {
    fetchNote();
  }, []);

  if (data === null) return;

  return (
    <Container>
      <Header />

      <main>
        <div>
          <ButtonText title="Excluir nota" onClick={handleDeleteNote} />

          <h1>{data.title}</h1>

          <p>{data.description}</p>

          {data.links.length > 0 && (
            <Section title="Links úteis">
              <ul>
                {data.links.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} target="_blank">
                      {link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {data.tags.length > 0 && (
            <Section title="Marcadores">
              {data.tags.map((tag) => (
                <Tag key={tag.id} title={tag.name} />
              ))}
            </Section>
          )}

          <Button label="Voltar" onClick={() => navigate(-1)} />
        </div>
      </main>
    </Container>
  );
}
