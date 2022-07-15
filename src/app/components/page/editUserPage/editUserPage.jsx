import React, { useState, useEffect } from "react"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/salectField"
import RadioField from "../../common/form/radioField"
import { validator } from "../../../utils/validator"
import MultiSelectField from "../../common/form/multiSelectField"
import BackHistoryButton from "../../common/backButton"
import { useDispatch, useSelector } from "react-redux"
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities"
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions"
import { getCurrentUserData, updateUser } from "../../../store/users"

const EditUserPage = () => {
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()

  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())

  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }))

  const professions = useSelector(getProfessions())
  const professionLoading = useSelector(getProfessionsLoadingStatus())
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(
      updateUser({
        ...data,
        qualities: data.qualities.map((q) => q.value)
      })
    )
  }

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = []
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }
  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }))
    return result
  }

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      })
    }
  }, [professionLoading, qualitiesLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

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
