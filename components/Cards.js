export default function MetricCard({metric }) {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card" style={{ width: " 18rem" }}>
          <div className="card-header">Total Infected</div>
          <div className="card-body">
            <p className="card-text">{metric.infected} </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card" style={{ width: " 18rem" }}>
          <div className="card-header">Total Recovered</div>
          <div className="card-body">
            <p className="card-text">{metric.recovered} </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card" style={{ width: " 18rem" }}>
          <div className="card-header">Total Deaths</div>
          <div className="card-body">
            <p className="card-text">{metric.fatal} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
