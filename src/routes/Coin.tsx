import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoininfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";


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
  background-color: ${(props) => props.theme.itemColor};
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

  color: ${(props) => props.theme.descTextColor};
  line-height: 22px;
  font-weight: 300;
  overflow: scroll;
  margin: 5vh 0;

  span {
    margin-top: 15px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  color: ${(props) => props.theme.textColor};
`;
const OverviewItem = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9vw;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: ${(props) => props.theme.itemColor};
  padding: 12px;
  border-radius: 15px;
  margin: 0 auto;
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

interface IQuotes {
  USD: {
    price: number;
  };
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  quotes: IQuotes;
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
interface RouteParams {
  coinId: string;
  [key: string]: string | undefined;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoininfo(coinId + "")
  );
  const { isLoading: tickersLoading, data: tickerData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId + ""),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {infoData?.name ? infoData?.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <h1 className="text-teal-400 text-3xl">
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </h1>
      </Header>
      <Body>
        <InfoWrapper>
          <div>
            <div>
              <span>RANK : </span>
              <span>{infoData?.rank}</span>
            </div>
            <div>
              <span>SYMBOL : </span>
              <span>{infoData?.symbol}</span>
            </div>
            <div>
              <span>Price : </span>
              <span>${tickerData?.quotes.USD.price.toFixed(3)}</span>
            </div>
          </div>
        </InfoWrapper>
        <DescWrapper>
          <span className="descSpan">{infoData?.description}</span>
        </DescWrapper>
        <InfoWrapper>
          <div>
            <div>
              <span>TOTAL SUPLY: </span>
              <span>{tickerData?.total_supply}</span>
            </div>
            <div>
              <span>MAX SUPPLY: </span>
              <span>{tickerData?.max_supply}</span>
            </div>
          </div>
        </InfoWrapper>
      </Body>

      <Overview>
        <OverviewItem isActive={chartMatch !== null ? true : false}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </OverviewItem>
        <OverviewItem isActive={priceMatch !== null ? true : false}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </OverviewItem>
      </Overview>
      <Routes>
        <Route path="chart" element={<Chart coinId={coinId as string} />} />
        <Route path="price" element={<Price />} />
      </Routes>
    </Container>
  );
}

export default Coin;
