import { csrfFetch } from "./csrf";

const ADD_COMMENT = "comments/addComment";
const DELETE_COMMENT = "comments/deleteComment";
const EDIT_COMMENT = "comments/editComment";

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

const removeComment = () => {
  return {
    type: DELETE_COMMENT,
  };
};

const editMyComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  };
};

export const addCommentToSong =
  ({ songId, body }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
    const data = await res.json();
    dispatch(addComment(data));
    return res;
  };

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  await res.json();
  dispatch(removeComment());
  return res;
};

export const editComment =
  ({ id, body }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ body }),
    });
    const data = await res.json();
    dispatch(editMyComment(data));
    return res;
  };

const commentsReducer = (state = { detail: {}, artist: {} }, action) => {
  const newState = { ...state };
  newState.detail = { ...state.detail };
  newState.artist = { ...state.artist };
  switch (action.type) {
    case ADD_COMMENT:
      newState.detail = action.comment;
      break;
    case DELETE_COMMENT:
      newState.detail = {};
      break;
    case EDIT_COMMENT:
      newState.detail = action.comment;
      break;
    default:
      break;
  }
  return newState;
};
export default commentsReducer;
