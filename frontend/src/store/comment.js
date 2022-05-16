import { csrfFetch } from "./csrf";

const ADD_COMMENT = "comments/addComment";

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

export const addCommentToSong = ({songId, body}) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    body: JSON.stringify({body})
  });
  const data = await res.json();
  dispatch(addComment(data));
  return res;
};


const commentsReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_COMMENT:
        return { ...state, detail: action.comment };
      default:
        return state;
    }
  };
  export default commentsReducer;