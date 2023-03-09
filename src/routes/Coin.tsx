import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
const Loading = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.accentColor};
`;

const Body = styled.div`
  padding: 0 20px;
`;

const InfoWrapper = styled.div`
  background-color: ${(props) => props.theme.brightBg};
  padding: 12px;
  border-radius: 15px;
  margin: 0 auto;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    color: ${(props) => props.theme.textColor};
    font-weight: 550;

    div {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
`;

const DescWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: #fff;
  line-height: 22px;
  font-weight: 300;
`;

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
  total_supply: number;
  max_supply: number;
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(info);

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(price);

      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || <Loading></Loading>}</Title>
      </Header>
      <Body>
        <InfoWrapper>
          <div>
            <div>
              <span>RANK : </span>
              <span>{info?.rank}</span>
            </div>
            <div>
              <span>SYMBOL : </span>
              <span>{info?.symbol}</span>
            </div>
            <div>
              <span>OPEN SOURCE : </span>
              <span>{info?.open_source ? "YES" : "NO"}</span>
            </div>
          </div>
        </InfoWrapper>
        <DescWrapper>
          <span>{info?.description}</span>
        </DescWrapper>
        <InfoWrapper>
          <div>
            <div>
              <span>TOTAL SUPLY: </span>
              <span>{price?.total_supply}</span>
            </div>
            <div>
              <span>MAX SUPPLY: </span>
              <span>{price?.max_supply}</span>
            </div>
          </div>
        </InfoWrapper>
      </Body>
    </Container>
  );
}

export default Coin;
