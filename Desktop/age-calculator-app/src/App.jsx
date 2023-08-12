import React from "react";
import Form from "./components/Form";
import Age from "./components/Age";
import "./index.css";

export default function App() {
  const [birthday, setBirthday] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const [age, setAge] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const [errors, setErrors] = React.useState({
    dayError: "",
    monthError: "",
    yearError: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setBirthday((oldBirthday) => ({
      ...oldBirthday,
      [name]: value,
    }));
  }

  function checkLeapYear(year) {
    if (year % 100 === 0 && year % 400 === 0) {
      return true;
    } else if (year % 4 == 0) {
      return true;
    }
    return false;
  }

  function checkValidDate(date) {
    const day = parseInt(date.day);
    const month = parseInt(date.month);
    const year = parseInt(date.year);

    const currentDate = new Date();

    let errorMessages = {
      dayError: "",
      monthError: "",
      yearError: "",
    };

    // Check if any field is empty
    if (!day) {
      errorMessages.dayError = "This field is required";
    }
    if (!month) {
      errorMessages.monthError = "This field is required";
    }
    if (!year) {
      errorMessages.yearError = "This field is required";
    }

    // Check if day is valid
    const monthsWith30Days = [4, 6, 9, 11];
    if (day >= 1 && day <= 31) {
      if (month === 2 && !checkLeapYear(year) && day > 28) {
        errorMessages.dayError = "Must be a valid day";
      } else if (month === 2 && checkLeapYear(year) && day > 29) {
        errorMessages.dayError = "Must be a valid day";
      } else if (monthsWith30Days.includes(month) && day > 30) {
        errorMessages.dayError = "Must be a valid day";
      }
    } else {
      errorMessages.dayError = "Must be a valid day";
    }

    // Check if month is valid
    if (!(month >= 1 && month <= 12)) {
      errorMessages.monthError = "Must be a valid month";
    }

    // Check if year is valid
    if(year === 0) {
      errorMessages.yearError = "There is no year 0"
    }

    // Check if the input day is in the future
    // NOTE: month param in Date() starts with 0 and ends with 11
    const inputDate = new Date(year, month - 1, day);
    const currentDaysSinceEpoch = Math.floor(currentDate / 8.64e7);
    const inputDaysSinceEpoch = Math.floor(inputDate / 8.64e7);

    if (currentDaysSinceEpoch - inputDaysSinceEpoch < 0) {
      errorMessages.yearError = "Must be in the past";
    }
    console.log(errorMessages);
    return errorMessages;
  }

  function calculateAge({ day, month, year }) {
    const currentTime = new Date();
    const birthdayDate = new Date(year, month - 1, day);
    const numberOfDays = Math.floor((currentTime - birthdayDate) / 8.64e7);

    // NOTE: 1 month here is set to 30 days for simplicity (30.437 is the average length)
    setAge({
      day: Math.floor((numberOfDays % 365) % 30),
      month: Math.floor(parseFloat(numberOfDays % 365).toFixed(10) / 30.436875),
      year: Math.floor(numberOfDays / 365),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { dayError, monthError, yearError } = checkValidDate(birthday);

    if (!dayError && !monthError && !yearError) {
      setErrors({
        dayError: "",
        monthError: "",
        yearError: "",
      });
      calculateAge(birthday);
    } else {
      setErrors({
        dayError: dayError,
        monthError: monthError,
        yearError: yearError,
      });
    }
  }

  return (
    <div className="container">
      <Form
        handleChange={handleFormChange}
        handleSubmit={handleSubmit}
        formData={birthday}
        errors={errors}
      />
      <Age data={age} />
    </div>
  );
}
