import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import useRedux from './useRedux';
import useUser from './useUser';
import useReadChats from './useReadChats';
import usePublicUser from './usePublicUser';
import { getDataOfProduct } from '@/backend/apiDataOfProduct';
import axios from "axios";
import { MyProductType } from '@/types/product.type';
import { fetchProductItem, getBestSellingProducts, getRandomProduct, getRecommendationss  } from '@/store/features/Homepage/HomepageSlice';
import { fetchDataRecommender, getUserId } from '@/store/features/RecommenderSystems/RecommenderSlice';
import { getProductToWishlist } from '@/store/features/Wishlist/wishlistSlice';
import { getDataChats, setNewAvatarUser, splitDataChat } from '@/store/features/User/userSlice';
import  usePostAiJson from '@/backend/usePostAiJson';
import { useRecommendations } from './use-ecommendations';


export default function useInitApp() {
  const { dispatch, appSelector } = useRedux();
  const { user } = useUser();
  const { mutate } = usePostAiJson();
  const userId = user?.id;

  const { data } = useQuery<MyProductType[]>({
    queryKey: ['DataOfProduct'],
    queryFn: getDataOfProduct,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { Data } = appSelector((state) => state.product);


  const { data: chatData } = useReadChats(userId || '');

  const { data: ALLUserData } = usePublicUser();

    const {
    data: recommendations,
    isLoading,
    isError,
  } = useRecommendations(userId);



  const updateData = useCallback(() => {
    if (data) {
      const updatedData = data.map((item: MyProductType) => ({
        ...item,
        quantity: 1,
      }));
      dispatch(fetchProductItem(updatedData));

      dispatch(fetchDataRecommender(updatedData));

    }
  }, [data, dispatch]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    if (Data && chatData && userId && ALLUserData && recommendations) {
      dispatch(getRandomProduct());
      dispatch(getBestSellingProducts());
      dispatch(getProductToWishlist(Data));
      dispatch(getDataChats(chatData));
      dispatch(setNewAvatarUser(ALLUserData));
      dispatch(splitDataChat(userId));      
      dispatch(getUserId(userId));      

    }
  }, [Data, chatData, dispatch, userId, ALLUserData , recommendations]);

  
    useEffect(() => {
    if (recommendations) { 
      console.log(recommendations);
        
      dispatch(getRecommendationss(recommendations));
    }
  }, [recommendations]);
  
  
const { BehaviorData } = appSelector((state) => state.RecommendData);

useEffect(() => {
  const isValidData = (data: any) => {
    if (!data) return false;

    // لو Array
    if (Array.isArray(data)) {
      return data.length > 0;
    }

    // لو Object
    if (typeof data === "object") {
      return Object.keys(data).length > 0;
    }

    return false;
  };

  const sendData = async () => {
    // ⛔ ما يرسلش لو الداتا مش صالحة
    if (!isValidData(BehaviorData)) return;

    try {
      await axios.post(
        import.meta.env.VITE_ai_endpoint,
        BehaviorData
      );
    } catch (err) {
      console.error("Error sending BehaviorData:", err);
    }
  };

  // إرسال أول مرة
  sendData();

  // كل دقيقة
  const interval = setInterval(() => {
    sendData();
  }, 60000);

  return () => clearInterval(interval);
}, [BehaviorData]);

}