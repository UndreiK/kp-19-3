import React, { useEffect, useState } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import API from "../../api"
import SelectField from "../common/form/salectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState([])

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionList)
    })
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const handleChange = (target) => {
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
    },
    profession: {
      isRequired: { message: "обязательно выберите профессию" }
    },
    licence: {
      isRequired: {
        message:
          "вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
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

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { profession, qualities } = data
    console.log({
      ...data,
      professoin: getProfessionById(profession),
      qualitis: getQualities(qualities)
    })
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
      <SelectField
        label="выберите вашу профессию"
        defaultOption="Choose..."
        name="profession"
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="выберите ваши качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        submit
      </button>
    </form>
  )
}

export default RegisterForm
