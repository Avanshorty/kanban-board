import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

function Dashboard({ tasks, categories }) {
  const today = new Date().toISOString().split("T")[0];

  const todoCount = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const doingCount = tasks.filter(
    (task) => task.status === "DOING"
  ).length;

  const doneCount = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const overdueCount = tasks.filter(
    (task) =>
      task.status !== "DONE" &&
      task.dueDate &&
      task.dueDate < today
  ).length;

  const statusChartData = {
    labels: ["TO DO", "DOING", "DONE"],
    datasets: [
      {
        data: [todoCount, doingCount, doneCount],
        backgroundColor: ["#64748b", "#f59e0b", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const categoryChartData = {
    labels: categories,
    datasets: [
      {
        label: "Number of Tasks",
        data: categories.map(
          (category) =>
            tasks.filter((task) => task.category === category).length
        ),
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "DONE" && task.completeDate
  );

  const earlyCount = completedTasks.filter(
    (task) => task.completeDate < task.dueDate
  ).length;

  const onTimeCount = completedTasks.filter(
    (task) => task.completeDate === task.dueDate
  ).length;

  const lateCount = completedTasks.filter(
    (task) => task.completeDate > task.dueDate
  ).length;

  const performanceChartData = {
    labels: ["Early", "On Time", "Late"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [earlyCount, onTimeCount, lateCount],
        backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const summaryCards = [
    {
      title: "Total Tasks",
      value: tasks.length,
      className: "total-card",
    },
    {
      title: "TO DO",
      value: todoCount,
      className: "todo-card",
    },
    {
      title: "DOING",
      value: doingCount,
      className: "doing-card",
    },
    {
      title: "DONE",
      value: doneCount,
      className: "done-card",
    },
    {
      title: "Overdue",
      value: overdueCount,
      className: "overdue-card",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>View the progress and performance of all tasks.</p>
        </div>
      </div>

      <div className="summary-grid">
        {summaryCards.map((card) => (
          <article
            className={`summary-card ${card.className}`}
            key={card.title}
          >
            <p>{card.title}</p>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>

      <div className="charts-grid">
        <article className="chart-card status-chart">
          <h3>Tasks by Status</h3>

          <div className="chart-container">
            <Doughnut
              data={statusChartData}
              options={chartOptions}
            />
          </div>
        </article>

        <article className="chart-card">
          <h3>Tasks by Category</h3>

          <div className="chart-container">
            <Bar
              data={categoryChartData}
              options={barChartOptions}
            />
          </div>
        </article>

        <article className="chart-card performance-chart">
          <h3>Completion Performance</h3>

          <div className="chart-container">
            <Bar
              data={performanceChartData}
              options={barChartOptions}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;