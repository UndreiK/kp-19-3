import React, { useState, useEffect } from "react"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/salectField"
import RadioField from "../../common/form/radioField"
import API from "../../../api"
import { validator } from "../../../utils/validator"
import MultiSelectField from "../../common/form/multiSelectField"
import { useParams, useHistory } from "react-router-dom"
import BackHistoryButton from "../../common/backButton"
// import { useAuth } from "../../../hooks/useAuth"

const EditUserPage = () => {
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    email: "",
    name: "",
    profession: "",
    sex: "male",
    qualities: []
  })
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState([])
  // const { currentUser } = useAuth()
  const { userId } = useParams()
  const history = useHistory()

  useEffect(() => {
    setIsLoading(true)
    API.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        profession: profession._id,
        qualities: qualities.map((qual) => ({
          label: qual.name,
          value: qual._id
        }))
      }))
    )
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

  const validatorConfig = {
    email: {
      isRequired: { message: "электронная почта обязательна для заполнения" },
      isEmail: { message: "email введен некорректно" }
    },

    name: {
      isRequired: { message: "введите имя" }
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
    API.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then(history.push(`/users/${data._id}`))
  }

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <TextField
                label="имя"
                type="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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

              <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                submit
              </button>
            </form>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
