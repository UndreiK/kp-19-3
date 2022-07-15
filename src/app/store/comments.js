import { createAction, createSlice } from "@reduxjs/toolkit"
import commentService from "../services/comment.service"
import { getCurrentUserId } from "./users"
import { nanoid } from "nanoid"

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentsCreated: (state, action) => {
      state.entities.push(action.payload)
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFailed,
  commentsCreated
} = actions

const addCommentRequested = createAction("comments/addCommentRequested")

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComment(userId)
    dispatch(commentsReceved(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (payload) => async (dispatch, getState) => {
  dispatch(addCommentRequested(payload))
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentsCreated(content))
    const comment = {
      ...payload,
      _id: nanoid(),
      created_at: Date.now(),
      userId: getCurrentUserId()(getState())
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
