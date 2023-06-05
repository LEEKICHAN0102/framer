import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container =styled.div`
  padding:0px 20px;
  max-width:480px;
  margin: 0 auto;
`;


const Header =styled.header`
  height:10vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const CoinList =styled.ul`
  margin-top:20px;
`;

const Coin =styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding:20px;
  border-radius:15px;
  margin-bottom:10px;
  font-weight:600;
  border: 1px solid white;
  a{
    display:flex;
    align-items:center;
    padding:10px;
    transition:color .2s ease-in-out;
  }
  &:hover{
    a{
      color:${(props)=>props.theme.accentColor}
    }
  }
`;

const Title = styled.h1`
  margin-top:30px;
  font-size:48px;
  color:${props=>props.theme.accentColor};
`;

const Loader=styled.div`
  text-align:center;
  align-items:center;
  display:block;
  margin-top:30px;
`;

const Img=styled.img`
  width:35px;
  height:35px;
  margin-right:10px;
`;

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}


function Coins(){
  const setDarkAtom=useSetRecoilState(isDarkAtom);
  const toggleDarkAtom=()=> setDarkAtom((prev)=>!prev);
  const {isLoading,data}=useQuery<ICoin[]>("allCoins", fetchCoins); //Replaced by react-query!!
  return <Container>
    <Header>
      <Title>Coin API</Title>
      <button onClick={toggleDarkAtom}>Toggle Mode</button>
    </Header>
    {isLoading ? <Loader>코인 불러오는 중</Loader>:
    <CoinList>
      {data?.slice(0,100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={{
              pathname:`/${coin.id}`,
              state:{name:coin.name},
            }}>
                <Img 
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />  
                {coin.name} &rarr;
              </Link>
          </Coin>
      ))}
    </CoinList>}
  </Container>
}

export default Coins;




