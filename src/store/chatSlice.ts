import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Users from '../../data/users.json';
import Groups from '../../data/groups.json';
import {getCurrentTime, getRandomImageUrl} from '../utils/common';
import {ImageSourcePropType} from 'react-native';

export type UserType = {
  id: number;
  first_name: string;
  last_name?: string;
  username: string;
  imageUrl?: ImageSourcePropType;
};

export type messageType = {
  senderId: number;
  senderName: string;
  timestamp: string;
  content: string;
};

export type GroupType = {
  id: number;
  members: number[];
  title: string;
  messages: messageType[];
  imageUrl?: ImageSourcePropType;
};

interface initialStateType {
  users: UserType[];
  groups: GroupType[];
  currentUser: UserType | null;
  openedConversation: GroupType | null;
}

const initialState: initialStateType = {
  users: Users.map(user => ({...user, imageUrl: getRandomImageUrl()})),
  groups: Groups.map(user => ({...user, imageUrl: getRandomImageUrl()})),
  currentUser: null,
  openedConversation: null,
};

export const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setCurrentUser: (state, actions: PayloadAction<UserType>) => {
      const {id, first_name, last_name, username} = actions.payload;
      state.currentUser = {
        id,
        first_name,
        last_name,
        username,
      };
    },
    setOpenedConversation: (state, actions: PayloadAction<GroupType>) => {
      const {id, members, messages, title, imageUrl} = actions.payload;
      state.openedConversation = {
        id,
        members,
        messages,
        title,
        imageUrl,
      };
    },
    sendMessage: (state, actions: PayloadAction<string>) => {
      state.groups = state.groups.map(group => {
        if (
          state.currentUser &&
          state.openedConversation &&
          group.id === state.openedConversation.id
        ) {
          group.messages.push({
            content: actions.payload,
            senderId: state.currentUser.id,
            senderName: state.currentUser.first_name,
            timestamp: getCurrentTime(),
          });
          state.openedConversation.messages.push({
            content: actions.payload,
            senderId: state.currentUser.id,
            senderName: state.currentUser.first_name,
            timestamp: getCurrentTime(),
          });
        }
        return group;
      });
    },
  },
});

export const {setCurrentUser, setOpenedConversation, sendMessage} =
  chatSlice.actions;

export default chatSlice.reducer;
