import React, { useEffect, useState } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import SelectField from "../common/form/salectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"
import { useQuality } from "../../hooks/useQuality"
import { useProfessions } from "../../hooks/useProfession"
import { useAuth } from "../../hooks/useAuth"
import { useHistory } from "react-router-dom"

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  })
  const { signUp } = useAuth()
  const [errors, setErrors] = useState({})
  const { professions } = useProfessions()
  const { qualities } = useQuality()

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))

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

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     if (prof.value === id) {
  //       return { _id: prof.value, name: prof.label }
  //     }
  //   }
  // }
  // const getQualities = (elements) => {
  //   const qualitiesArray = []
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color
  //         })
  //       }
  //     }
  //   }
  //   return qualitiesArray
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
    console.log(newData)
    try {
      await signUp(newData)
      history.push("/")
    } catch (error) {
      setErrors(error)
    }
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
        options={professionsList}
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
        options={qualitiesList}
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
