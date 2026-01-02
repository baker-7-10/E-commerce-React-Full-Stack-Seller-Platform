import { MyProductType } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';

type ProductArray = MyProductType[];

interface InitialState {
  [key: string]: ProductArray;
  
}

const initialState: InitialState = {
  Data: [],
  randomProduct: [],
  BestSellingProducts: [],
  wishlistData: [],
  productsILiked: [],
  ProductDetails: [],
  userRecommendations: []
};

const categoryNameMap = {
  "WomenFashion": "Women’s Fashion",
  "MenFashion": "Men’s Fashion",
  "Electronics": "Electronics",
  "HomeLifestyle": "Home & Lifestyle",
  "Medicine": "Medicine",
  "SportsOutdoor": "Sports & Outdoor",
  "BabyToys": "Baby’s & Toys",
  "GroceriesPets": "Groceries & Pets",
  "HealthBeauty": "Health & Beauty"
};




const HomepageReducer = createSlice({
  name: 'Homepage',
  initialState,
  reducers: {
    fetchProductItem(state, action) {
      state.Data = action.payload;
    },
    getRandomProduct(state) {
      const randomNumbersArray = Array.from(
        { length: 15 },
        () => Math.floor(Math.random() * 20) + 1
      );
      state.randomProduct = state.Data.filter((_, i) =>
        randomNumbersArray.includes(i)
      );
    },
    getBestSellingProducts(state) {
      state.BestSellingProducts = state.Data.map((data) => data).sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
    },
getRecommendationss(state, action) {
  if (!action.payload || action.payload.length === 0) return;
  
  const data = action.payload[0];

  const sortedCategories = Object.entries(data)
    .filter(([key]) =>
      !["id", "user_id", "created_at"].includes(key)
    )
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({
      originalName: key,
      categoryName: categoryNameMap[key],
      score: value
    }));

  // أعلى 5 كاتيجوري
  const topCategories = sortedCategories.slice(0, 5);

  // عدد المنتجات لكل كاتيجوري
  const productsPerCategory = [8, 5, 3, 2, 1];

  let recommendations = [];

  topCategories.forEach(({ categoryName }, index) => {
    const products = state.Data
      .filter(product => product.category === categoryName)
      .slice(0, productsPerCategory[index]); // تحديد العدد
    recommendations.push(...products);
  });

  state.userRecommendations = recommendations;
},

    setProductDetails(state, action) {
      state.ProductDetails = action.payload;
    },
    getProductsILiked(state, action) {
      const findProduct = state.Data.find((data) => data.id === action.payload);
      if (findProduct) {
        if (!state.productsILiked.some((e) => e.id === action.payload)) {
          state.productsILiked.push(findProduct);
        } else {
          state.productsILiked = state.productsILiked.filter(
            (arr) => arr.id !== findProduct.id
          );
        }
      }
    },
  },
});

export default HomepageReducer.reducer;
export const {
  fetchProductItem,
  getRandomProduct,
  getBestSellingProducts,
  getProductsILiked,
  setProductDetails,
  getRecommendationss,
} = HomepageReducer.actions;
