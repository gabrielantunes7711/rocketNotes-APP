import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";
  width: 100%;
  height: 100vh;

  main {
    grid-area: content;
    overflow-y: auto;
    padding: 64px 0;

    > div {
      max-width: 550px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      > button:first-child {
        align-self: end;
      }
    }
  }

  h1 {
    font-size: 36px;
    font-weight: 500;
    margin-top: 64px;
  }

  p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }
`;

export default Container;
