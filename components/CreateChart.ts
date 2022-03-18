import { _DeepPartialObject } from "chart.js/types/utils";

export const Radardata = {
  labels: ["実用度", "シンプル度", "おしゃれ度", "変態度"],
  datasets: [
    {
      data: [5, 3, 4, 3],
      backgroundColor: "rgba(19,255,155, 0.2)",
      borderColor: "rgba(19,255,155,1)",
      borderWidth: 3,
    },
  ],
};

export const Radaroptions = {
  scales: {
    r: {
      // 中心からスケーリングするアニメーションの有無
      animate: false,
      // グラフの最小値
      suggestedMin: 0,
      // グラフの最大値
      suggestedMax: 5,
      // アングルライン
      angleLines: {
        display: false,
      },
      // グリッドライン
      grid: {
        color: "snow",
      },
      // 各項目のラベル
      pointLabels: {
        color: "snow",
      },
      ticks: {
        // 刻み幅
        stepSize: 1,
        // 目盛りラベル表示の有無
        display: false,
        padding: 10,
      },
    },
  },
};
