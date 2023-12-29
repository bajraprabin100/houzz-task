import { AnyAction } from 'redux';
import { MessagesState } from '.';
import { MessagesActionEnum } from '../actions';

const initialState: MessagesState = {
  unreadMessagesCount: null
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case MessagesActionEnum.GET_UNREAD_MESSAGE_COUNT:
      return {
        ...state,
        unreadMessagesCount: action.payload
      };
    case MessagesActionEnum.GET_UNREAD_MESSAGE_COUNT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
