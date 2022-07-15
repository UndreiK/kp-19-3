import React, { useEffect, useState } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAuthErrors, login } from "../../store/users"

const LoginForm = () => {
  const history = useHistory()
  const loginError = useSelector(getAuthErrors())
  const dispatch = useDispatch

  const [data, setData] = useState({ email: "", password: "", stayOn: false })
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: "электронная почта обязательна для заполнения" }
    },
    password: {
      isRequired: { message: "пароль обязателен для заполнения" }
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
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/"
    dispatch(login({ payload: data, redirect }))
  }

  return (
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        submit
      </button>
    </form>
  )
}

export default LoginForm
