import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userRedux'

const Container = styled.div`
  height: 150px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const ImageLogo = styled.img`
  width: 22%;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid`,
    padding: '0 4px',
  },
}));

const Image = styled.img`
  width: 50px;
  border-radius: 50%;
  margin: auto 0px;
`

const Navbar = () => {

  const dispatch = useDispatch()
  const quantity = useSelector(state => state.cart.quantity)
  let user = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  
  const handleClickLogOut = () => {
  
    dispatch(logoutUser({}))

    navigate('/')

  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Buscar" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <NavLink to="/">
            <ImageLogo alt='logo Women Shop' src='https://i.ibb.co/jv7T7k4/logo-no-background.png'/>
          </NavLink>
        </Center>
        <Right>

          {user === null ?
            <>
              <NavLink to="/register">
                <MenuItem>REGISTRARSE</MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem>LOGUIN</MenuItem>
              </NavLink>
            </>
            :
            <>
              <MenuItem onClick={() => handleClickLogOut()}>LOGOUT</MenuItem>
              <MenuItem>
                <Image alt={user.username} src={user.file} />
              </MenuItem>
            </>
          }

          <NavLink to="/cart">
            <MenuItem>
              <StyledBadge badgeContent={quantity} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </MenuItem>
          </NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;