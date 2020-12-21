import { queryArticle} from './service';
import {queryArticleById} from "@/pages/article/service";

const Model = {
  namespace: 'article',
  state: {
    article: [{
      id:1,
      title:"123",
      content:"22222"
    }],

    articleInfo:{
      content:1212,
    },
    total:50

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
      payload.currentPage=payload.current
      const response = yield call(queryArticle, payload);
      yield put({
        type: 'setArticle',
        payload: response,
      });
    },
    *queryById({ payload }, { call, put }) {
      const response = yield call(queryArticleById, payload);
      yield put({
        type: 'setArticleInfo',
        payload: response,
      });
    },
  },
  reducers: {
    setArticle(state, action) {
      // console.log(action)
      return { ...state, article: action.payload.value || [],total:action.payload.total };
    },
    setArticleInfo(state, action) {
      // console.log(action)
      return { ...state, articleInfo: action.payload.value };
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
