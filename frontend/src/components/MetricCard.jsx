function MetricCard({ label, value }) {
  return (
    <article className="panel metric-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}

export default MetricCard;
