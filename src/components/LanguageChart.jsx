import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#0ea5e9", "#f472b6", "#f97316", "#22d3ee", "#84cc16", "#facc15", "#10b981"];

function LanguageChart({ repos }) {
  const languageData = useMemo(() => {
    const counts = repos.reduce((acc, repo) => {
      if (!repo.language) {
        return acc;
      }
      const key = repo.language;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(counts).map(([name, value]) => ({ name, value }));
    const total = entries.reduce((sum, item) => sum + item.value, 0);

    return entries
      .map((item) => ({
        ...item,
        percentage: Math.round((item.value / total) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }, [repos]);

  if (!languageData.length) {
    return null;
  }

  return (
    <section className="card language-chart">
      <div className="chart-header">
        <div>
          <p className="muted small-label">Tech snapshot</p>
          <h3>Languages Overview</h3>
        </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={languageData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
              {languageData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} repos`, name]} />
          </PieChart>
        </ResponsiveContainer>

        <ul className="chart-legend">
          {languageData.map((entry, index) => (
            <li key={entry.name}>
              <span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="language-name">{entry.name}</span>
              <span className="language-percentage">{entry.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LanguageChart;
