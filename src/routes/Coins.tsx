import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const Wrapper = styled.div`
//   max-width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Container = styled.div`
  padding: 0 20px;
  
  
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
  background-color: #fff;

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

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>

        <Body>
          <CoinList>
            {loading ? (
              <Loading>Loading</Loading>
            ) : (
              coins?.map((coin) => (
                <Coin key={coin.id}>
                  <Link
                    to={{
                      pathname: `/${coin.id}`,
                    }}
                    state = {{name: coin.name}}
                  >
                    <CoinImg
                      src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
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
