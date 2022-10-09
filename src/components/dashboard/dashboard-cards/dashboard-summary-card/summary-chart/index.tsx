import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

const data = [
  {
    name: "04.30",
    HR: 60,
  },
  {
    name: "05 PM",
    HR: 25,
  },
  {
    name: "05.30",
    HR: 95,
  },
  {
    name: "06 PM",
    HR: 51,
  },
  {
    name: "06.30",
    HR: 49,
  },
  {
    name: "07 PM",
    HR: 20,
  },
  {
    name: "07.30",
    HR: 60,
  },
  {
    name: "08 PM",
    HR: 20,
  },
  {
    name: "08.30",
    HR: 60,
  },
  {
    name: "09 PM",
    HR: 70,
  },
];

const SummaryChart = () => {
  return (
    <ResponsiveContainer max-width="100%" height="100%">
      <AreaChart
        width={500}
        max-height={400}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -30,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#636262" fontSize="0.7rem">
          <Label
            style={{
              textAnchor: "middle",
              fontSize: "0.7rem",
              fontWeight: "500",
              color: "#1E1E1E",
            }}
            dy={20}
            value={"Harvest Report (Example)"}
          />
        </XAxis>
        <YAxis stroke="#636262" fontSize="0.7rem" />
        <Tooltip />
        <Area type="monotone" dataKey="HR" stroke="#1A9035" fillOpacity={1} fill="#1A9035" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SummaryChart;
