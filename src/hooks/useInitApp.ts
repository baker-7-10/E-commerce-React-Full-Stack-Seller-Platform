import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import useRedux from './useRedux';
import useUser from './useUser';
import useReadChats from './useReadChats';
import usePublicUser from './usePublicUser';
import { getDataOfProduct } from '@/backend/apiDataOfProduct';
import axios from "axios";
import { MyProductType } from '@/types/product.type';
import { fetchProductItem, getBestSellingProducts, getRandomProduct } from '@/store/features/Homepage/HomepageSlice';
import { fetchDataRecommender, getUserId } from '@/store/features/RecommenderSystems/RecommenderSlice';
import { getProductToWishlist } from '@/store/features/Wishlist/wishlistSlice';
import { getDataChats, setNewAvatarUser, splitDataChat } from '@/store/features/User/userSlice';
import  usePostAiJson from '@/backend/usePostAiJson';


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
    if (Data && chatData && userId && ALLUserData) {
      dispatch(getRandomProduct());
      dispatch(getBestSellingProducts());
      dispatch(getProductToWishlist(Data));
      dispatch(getDataChats(chatData));
      dispatch(setNewAvatarUser(ALLUserData));
      dispatch(splitDataChat(userId));      
      dispatch(getUserId(userId));      
    }
  }, [Data, chatData, dispatch, userId, ALLUserData]);

  
  
  
  
  const { BehaviorData } = appSelector((state) => state.RecommendData);
  useEffect(() => {
    // دالة الإرسال
    const sendData = async () => {
      try {
        await axios.post("http://127.0.0.1:8000/calculate_interest", BehaviorData);
        console.log("BehaviorData sent successfully");
      } catch (err) {
        console.error("Error sending BehaviorData:", err);
      }
    };

    // أول إرسال عند الماونت مباشرة
    sendData();

    // كل 60 ثانية
    const interval = setInterval(() => {
      sendData();
    }, 60000); // 60000 ms = 1 دقيقة

    // تنظيف عند إزالة المكون
    return () => clearInterval(interval);
  }, [BehaviorData]); // لو تغير BehaviorData رح يعيد التشغيل
  
  
  // useEffect(() => {
  //   const sendData = async () => {
  //     let res;
  //     try {
  //       res =await axios.get("http://127.0.0.1:8000/ai");
  //       console.log("BehaviorData sent successfully");

  //     } catch (err) {
  //       console.error("Error sending BehaviorData:", err);
  //     }
  //   };

  //   sendData();

  //   const interval = setInterval(() => {
  //     sendData();
  //   }, 60000); // 60000 ms = 1 دقيقة

  //   return () => clearInterval(interval);
  // }, []); 



}