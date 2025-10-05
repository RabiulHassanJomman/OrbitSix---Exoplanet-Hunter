import React from "react";

function buildScales(data, width, height, padding, xDomain, yDomain) {
  const times = data.map((d) => d.time);
  const fluxes = data.map((d) => d.flux);

  const minX = xDomain ? xDomain[0] : Math.min(...times);
  const maxX = xDomain ? xDomain[1] : Math.max(...times);
  const minY = yDomain ? yDomain[0] : Math.min(...fluxes);
  const maxY = yDomain ? yDomain[1] : Math.max(...fluxes);

  const xScale = (x) => {
    if (maxX === minX) return padding;
    return padding + ((x - minX) / (maxX - minX)) * (width - padding * 2);
  };

  const yScale = (y) => {
    if (maxY === minY) return height - padding;
    return (
      height - padding - ((y - minY) / (maxY - minY)) * (height - padding * 2)
    );
  };

  return { xScale, yScale, domain: { minX, maxX, minY, maxY } };
}

const LightCurveChart = ({
  data,
  width = 600,
  height = 300,
  showPoints = false,
  title = "Transit Light Curve",
  xDomain,
  yDomain,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-400 text-sm">
        No light curve data to display.
      </div>
    );
  }

  const padding = 65;
  const { xScale, yScale, domain } = buildScales(
    data,
    width,
    height,
    padding,
    xDomain,
    yDomain
  );
  const points = data.map((d) => ({ x: xScale(d.time), y: yScale(d.flux) }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  // Axis labels
  const leftAxisX = padding;
  const bottomAxisY = height - padding;

  // Ticks similar to sample figure
  const xTickValues = (() => {
    const start = Math.ceil(domain.minX);
    const end = Math.floor(domain.maxX);
    const ticks = [];
    for (let t = start; t <= end; t += 1) ticks.push(t);
    return ticks;
  })();
  const yTickValues = (() => {
    const step = 0.002;
    const start = Math.ceil(domain.minY / step) * step;
    const end = Math.floor(domain.maxY / step) * step;
    const ticks = [];
    // add one extra below/above to mimic framing
    for (let y = start; y <= end; y = parseFloat((y + step).toFixed(6))) {
      ticks.push(parseFloat(y.toFixed(6)));
    }
    return ticks;
  })();

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="block mx-auto">
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="rgb(15,23,42)" />

        {/* Title */}
        <text
          x={width / 2}
          y={padding / 1.5}
          textAnchor="middle"
          fill="#cbd5e1"
          fontSize="14"
        >
          {title}
        </text>

        {/* Axes */}
        <line
          x1={leftAxisX}
          y1={padding}
          x2={leftAxisX}
          y2={bottomAxisY}
          stroke="#475569"
          strokeWidth="1"
        />
        <line
          x1={leftAxisX}
          y1={bottomAxisY}
          x2={width - padding}
          y2={bottomAxisY}
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Grid and ticks */}
        {xTickValues.map((t, i) => {
          const x = xScale(t);
          return (
            <g key={`xt-${i}`}>
              <line
                x1={x}
                y1={bottomAxisY}
                x2={x}
                y2={bottomAxisY + 5}
                stroke="#64748b"
              />
              <line
                x1={x}
                y1={padding}
                x2={x}
                y2={bottomAxisY}
                stroke="#1f2937"
                opacity="0.4"
              />
              <text
                x={x}
                y={bottomAxisY + 18}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="10"
              >
                {t!== "0" ? t + "00" : t}
              </text>
            </g>
          );
        })}
        {yTickValues.map((v, i) => {
          const y = yScale(v);
          return (
            <g key={`yt-${i}`}>
              <line
                x1={leftAxisX - 5}
                y1={y}
                x2={leftAxisX}
                y2={y}
                stroke="#64748b"
              />
              <line
                x1={leftAxisX}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#1f2937"
                opacity="0.4"
              />
              <text
                x={leftAxisX - 8}
                y={y + 3}
                textAnchor="end"
                fill="#94a3b8"
                fontSize="10"
              >
                {v.toFixed(3)}
              </text>
            </g>
          );
        })}

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - padding / 3}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="12"
        >
          Time (Days)
        </text>
        <text
          x={padding / 3}
          y={height / 2}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="12"
          transform={`rotate(-90, ${padding / 3}, ${height / 2})`}
        >
          Relative Brightness
        </text>

        {/* Data path */}
        <path d={pathD} fill="none" stroke="#60a5fa" strokeWidth="2" />

        {/* Optional points */}
        {showPoints &&
          points.map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r={1} fill="#60a5fa" />
          ))}
      </svg>
    </div>
  );
};

export default LightCurveChart;
