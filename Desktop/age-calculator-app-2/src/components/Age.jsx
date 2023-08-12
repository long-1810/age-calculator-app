export default function Age(props) {
  return (
    <div className="age-container">
      <p className="age-result">
        <span className="number">
          {props.data.year !== "" ? props.data.year : "- -"}
        </span>{" "}
        years
      </p>
      <p className="age-result">
        <span className="number">
          {props.data.month !== "" ? props.data.month : "- -"}
        </span>{" "}
        months
      </p>
      <p className="age-result">
        <span className="number">
          {props.data.day !== "" ? props.data.day : "- -"}
        </span>{" "}
        days
      </p>
    </div>
  );
}
