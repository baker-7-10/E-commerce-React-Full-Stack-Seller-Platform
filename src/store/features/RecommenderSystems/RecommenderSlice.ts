import { MyProductType } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';
const initialState:{
  Data: MyProductType[];
  recommendProduct:{
    timeSpent: number;
    productId: string;
    Category: string;
  }[];
  userId: string;
  productlike: MyProductType[];
  SearchWorld: string[];
  dataAfterSort :{
    timeSpent: number;
    productId: string;
    Category: string;
  }[];
} = {
  Data: [],
  recommendProduct: [],
  userId:'',
  dataAfterSort: [],
  productlike: [],
  SearchWorld: [],
  BehaviorData: {}

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

  // تحويل الوقت لنقاط (كل دقيقة = نقطة)
  const points = maxItem ? Math.floor(maxItem.timeSpent / 60) : 0;

  // إعداد BehaviorData لإرساله للفرونت
  state.BehaviorData = {
    user_id: state.userId,
    category: maxItem.Category,
    productId: maxItem.productId,
    time:maxItem.timeSpent,
  };

  // حفظ العنصر الأعلى فقط في dataAfterSort (اختياري)
  state.dataAfterSort = maxItem ? [maxItem] : [];
},

   
    getUserId(state, action) {
    state.userId = action.payload;
  },
  getSearchWorld(state, action) {
    state.SearchWorld = [...state.SearchWorld, action.payload , state.userId];
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
