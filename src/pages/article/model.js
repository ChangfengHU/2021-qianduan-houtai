import { queryArticle} from './service';

const Model = {
  namespace: 'article',
  state: {
    article: [{
      id:1,
      title:"123"
    }],

  },
  effects: {
    *fetch(_, { call, put }) {
      console.log(1111)
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *queryArticle({ payload }, { call, put }) {

      const response = yield call(queryArticle, payload);
      console.log(response)
      yield put({
        type: 'setArticle',
        payload: response,
      });
    },
  },
  reducers: {
    setArticle(state, action) {
      console.log(action)
      return { ...state, article: action.payload.value || {} };
    },

    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    setProvince(state, action) {
      return { ...state, province: action.payload };
    },

    setCity(state, action) {
      return { ...state, city: action.payload };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
