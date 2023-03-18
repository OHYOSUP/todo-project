import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atoms";
import {useRecoilValue} from 'recoil'


interface ChartProps {
  coinId: string;
}

interface IHistorycal {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {

  const isDarkMode = useRecoilValue(isDarkAtom)


  const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#636e72"], stops: [0, 100] },
            },
            colors: ["#4cd137"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toString().slice(0, 3)},000`,
              },
            },
            theme: {
              mode: isDarkMode ? "dark" : "light",              
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
