import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../components/Announcement.js"
import Footer from "../components/Footer.js"
import Navbar from "../components/Navbar.js"
import { mobile } from "../responsive"
import { descOneProduct, incOneProduct, deleteCart } from "../redux/cartRedux.js"
import { useSelector, useDispatch } from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { userRequest } from "../requestMethods"

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 1px;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 8px
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonAscDesc = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  &:hover{
    color: blue;
}
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {

  const cart = useSelector(state => state.cart)
  
  const file = useSelector(state => state.user.currentUser)
  
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState()

  const [stripeToken, setStripeToken] = useState(null)
  const navigate = useNavigate()

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {

    const makeRequest = async () => {
      try {
        
        const resNewCart = await userRequest.post('/carts', { cart })

        const res = await userRequest.post('/checkout/payment', { cart, tokenId: stripeToken })

        navigate("/success", { state: { stripeData: res.data, resNewCart: resNewCart.data } });

      } catch (error) {
        console.log('Error: ', error);
      }
    }
    stripeToken && cart.total >= 1 && makeRequest();

  }, [stripeToken, cart, cart.total, navigate])

  const handleQuantity = (type, q, id, price, total) => {
    if (type === "dec") {
      setQuantity(q)
      dispatch(descOneProduct({ cart, quantity, id, price, total }))
    } else {
      setQuantity(q)
      dispatch(incOneProduct({ cart, quantity, id, price, total }))
    }
  }

  const handleClickVaciarCarrito = () => {
    dispatch(deleteCart({}))
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>MI CARRITO</Title>
        <Top>
          <NavLink to="/">
            <TopButton>CONTINUAR COMPRANDO</TopButton>
          </NavLink>
          <TopTexts>
            <TopText>Mi Bolsa de Compras({cart.quantity})</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={()=> handleClickVaciarCarrito()}>VACIAR MI CARRITO</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <div key={index}>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Producto:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <b>Color:</b>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Talle:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ButtonAscDesc>
                        <Remove onClick={() => handleQuantity("dec", product.quantity, product._id, product.price, cart.total)} />
                      </ButtonAscDesc>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <ButtonAscDesc>
                        <Add onClick={() => handleQuantity("inc", product.quantity, product._id, product.price, cart.total)} />
                      </ButtonAscDesc>
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>RESUMEN DEL PEDIDO</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Costo de env??o</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Descuento en el env??o</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Women-Shop"
              image={file ? file.file : ""}
              billingAddress
              shippingAddress
              description={`El total es: $${cart.total}`}
              amount={cart.amount * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>IR AL CHECKOUT AHORA</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;