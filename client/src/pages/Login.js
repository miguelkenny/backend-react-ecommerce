import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://cdn.pixabay.com/photo/2014/11/14/21/24/woman-531252_960_720.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  margin-bottom: 10px;
  &:disabled{
    color: white;
    cursor: not-allowed;
    alt: password incorrectos
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("*")
  const [rePassword, setRePassword] = useState("**")

  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.user)

  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password })
  }

  return (
    <Container>
      <Wrapper>
        <Title>INGRESA A TU CUENTA</Title>
        <Form>
          <Input
            placeholder="usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="contraseña"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="repetir contraseña"
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
          />
          {password !== rePassword
            ? <Button style={{ background: 'gray' }} disabled={true}>INICIAR SESION</Button>
            : <Button style={{ background: 'teal', cursor: 'pointer' }} onClick={handleClick} disabled={isFetching} >INICIAR SESION</Button>
          }
          {error && <Error >Algo salío mal... Datos de acceso incorrectos</Error>}
          <Link>No Recuerdas Tu Usuario o Contraseña?</Link>
          <NavLink to="/register">REGISTRARSE</NavLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;