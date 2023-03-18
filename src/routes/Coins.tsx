import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.titleColor};
  font-size: 32px;
`;

const Body = styled.div`
  padding: 0 20px;
`;
const CoinList = styled.ul`
  height: 15vh;
`;
const Coin = styled.li`
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.itemColor};

  a {
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loading = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.accentColor};
`;

const CoinImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  [key: string]: any;
}
interface RouteParams {
  coinId: string;
  [key: string]: string | undefined;
}
function Coins() {
  const { coinId } = useParams<RouteParams>();

  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkAtom)

  const modeToggle = ()=>{
    setIsDarkMode(prev=> !prev)
  }

  const { isLoading, data } = useQuery<ICoin>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>CryptoCurrency</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={modeToggle}>toggleMode</button>
      </Header>
      <Body>
        <CoinList>
          {isLoading ? (
            <Loading>Loading</Loading>
          ) : (
            data?.slice(0, 100).map((coin: any) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                  }}
                  state={{ name: coin.name }}
                >
                  {/* <img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol}`} /> */}
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))
          )}
        </CoinList>
      </Body>
    </Container>
  );
}

export default Coins;
