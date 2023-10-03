import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

  body{
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: 'Roboto Slab', serif;
    font-size:16px;
    -webkit-font-smoothing: antialiased;
  }

  input,
  button,
  textarea{
    font: inherit;
    outline: none;
  }

  a{
    text-decoration:none;
  }

  button,
  a{
    cursor:pointer;
    transition: filter 200ms;
  }

  button:hover,
  a:hover{
    filter:brightness(0.9)
  }

`;
