import React, { useEffect, useState } from "react"
import TextField from "../components/textField"
import { validator } from "../utils/validator"

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: "электронная почта обязательна для заполнения" },
      isEmail: { message: "email введен некорректно" }
    },
    password: {
      isRequired: { message: "пароль обязателен для заполнения" },
      isCapitalSymbol: { message: "пароль должен содержать заглавную букву" },
      isContainDigit: { message: "пароль должен содержать цифру" },
      min: { message: "пароль должен быть не менее 8 символов", value: 8 }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
