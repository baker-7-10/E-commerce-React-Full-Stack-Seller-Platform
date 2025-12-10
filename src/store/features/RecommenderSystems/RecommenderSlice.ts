import { MyProductType } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';

// نوع مخصص لبيانات الBehavior
type BehaviorType = {
  user_id: string;
  category: string;
  productId: string;
  time: number;
};

const initialState: {
  Data: MyProductType[];
  recommendProduct: {
    timeSpent: number;
    productId: string;
    Category: string;
  }[];
  userId: string;
  productlike: MyProductType[];
  SearchWorld: string[];
  dataAfterSort: {
    timeSpent: number;
    productId: string;
    Category: string;
  }[];
  BehaviorData: BehaviorType | {}; // 👈 إضافة behavior data للنوع
} = {
  Data: [],
  recommendProduct: [],
  userId: '',
  productlike: [],
  SearchWorld: [],
  dataAfterSort: [],
  BehaviorData: {}, // 👈 الآن أصبح قانوني
};

const RecommenderSlice = createSlice({
  name: 'Recommender',
  initialState,
  reducers: {
    fetchDataRecommender(state, action) {
      state.Data = action.payload;
    },

    getDataToRecommend(state, action) {
      // أضف العنصر الجديد للقائمة
      state.recommendProduct.push(action.payload);

      if (state.recommendProduct.length === 0) return;

      // إيجاد العنصر الأعلى وقتاً
      const maxItem = state.recommendProduct.reduce((max, curr) => {
        return curr.timeSpent > (max?.timeSpent ?? -Infinity) ? curr : max;
      }, null);

      // إعداد BehaviorData لإرساله للفرونت
      if (maxItem) {
        state.BehaviorData = {
          user_id: state.userId,
          category: maxItem.Category,
          productId: maxItem.productId,
          time_sec: maxItem.timeSpent,
          product_name:maxItem.product_name

        };

        state.dataAfterSort = [maxItem];
      }
    },

    getUserId(state, action) {
      state.userId = action.payload;
    },

    getSearchWorld(state, action) {
      state.SearchWorld = [
        ...state.SearchWorld,
        action.payload,
        state.userId,
      ];
    },
  },
});

export default RecommenderSlice.reducer;

export const {
  fetchDataRecommender,
  getDataToRecommend,
  getUserId,
  getSearchWorld,
} = RecommenderSlice.actions;
