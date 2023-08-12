import arrowImg from "../assets/images/icon-arrow.svg";

export default function Form(props) {
  const { dayError, monthError, yearError } = props.errors;
  const containerStyle = {
    gridTemplateRows:
      !dayError && !monthError && !yearError
        ? "repeat(2, auto)"
        : "repeat(3, auto)",
  };
  const inputStyle = {
    border:
      dayError && monthError && yearError
        ? "1px solid hsl(0, 100%, 67%)"
        : "1px solid hsl(0, 0%, 86%)",
  };

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-container" style={containerStyle}>
        <label htmlFor="day">DAY</label>
        <input
          type="text"
          placeholder="DD"
          value={props.formData.day}
          onChange={props.handleChange}
          name="day"
          id="day"
          style={inputStyle}
        />
        {dayError && monthError && yearError && (
          <p className="error">{dayError}</p>
        )}

        <label htmlFor="month">MONTH</label>
        <input
          type="text"
          placeholder="MM"
          value={props.formData.month}
          onChange={props.handleChange}
          name="month"
          id="month"
          style={inputStyle}
        />
        {dayError && monthError && yearError && (
          <p className="error">{monthError}</p>
        )}

        <label htmlFor="year">YEAR</label>
        <input
          type="text"
          placeholder="YYYY"
          value={props.formData.year}
          onChange={props.handleChange}
          name="year"
          id="year"
          style={inputStyle}
        />
        {dayError && monthError && yearError && (
          <p className="error">{yearError}</p>
        )}
      </div>
      <div className="seperator">
        <hr />
        <button id="arrow">
          <img src={arrowImg} alt="" />
        </button>
      </div>
    </form>
  );
}
