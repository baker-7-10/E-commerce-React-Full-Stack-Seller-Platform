import { lazy } from 'react';
import { Route } from 'react-router-dom';

import AppLayout from './AppLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages - Static
// import ContactPage from '@/page/static/ContactPage';
// import About from '@/page/static/About';

// Pages - Other
// import CheckOut from '@/page/CheckOut/CheckOut';
// import LikePage from '@/page/LikePage';
// import WebRTC from '@/page/WebRTC';
// import ViewByCategory from '@/page/ViewByCategory';
// import ViewProductDetails from '@/page/ViewProductDetails/ViewProductDetails';
// import Commentpage from './components/Navbar/components/Comment/Commentpage';

// Lazy-loaded Pages
// const Homepage = lazy(() => import('@/APP/store/features/Homepage/Homepage'));
// const Cart = lazy(() => import('@/APP/store/features/Cart/Cart'));
// const Wishlist = lazy(() => import('@/APP/store/features/Wishlist/Wishlist'));
// const MyAccount = lazy(() => import('@/APP/store/features/User/components/MyAccount'));
// const ChatPage = lazy(() => import('@/APP/store/features/User/components/cahtUser/ChatPage'));
// const MessageNotifications = lazy(() => import('@/APP/store/features/User/components/cahtUser/MessageNotifications'));
// const AddNewProduct = lazy(() => import('@/APP/store/features/User/components/AddNewProduct'));
// const UserPage = lazy(() => import('@/APP/store/features/User/UserPage'));
// const Error = lazy(() => import('@/ui/Error/Error'));

// Stripe & DnD
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Homepage from '@/page/Homepage/Homepage';
import ContactPage from '@/page/ContactPage';
import About from '@/page/About';
import Cart from '@/page/cart/Cart';
import CheckOut from '@/page/CheckOut/CheckOut';
import LikePage from '@/page/LikePage/LikePage';
import Wishlist from '@/page/wishlist/Wishlist';
import MessageNotifications from '@/page/cahtUser/components/MessageNotifications';
import UserPage from '@/page/User/UserPage';
import MyAccount from '@/page/MyAccount';
import WebRTC from '@/page/z_Coming_soon/WebRTC';
import ViewByCategory from '@/page/ViewByCategory/ViewByCategory';
import ViewProductDetails from '@/page/ViewProductDetails/ViewProductDetails';
import AddNewProduct from '@/page/AddNewProduct';
import ChatPage from '@/page/cahtUser/ChatPage';
import Commentpage from '@/page/Comment/Commentpage';
import EditProducts from '@/page/EditProducts';
import Error from '@/components/Error/Error';

const stripeUrl = 'pk_test_51QPYMAKxnNgqIQklhBT5FTH7UU1rPPpPP78wG0n7dsGfze107LYUk1WhLbMs5mzZj6DPfYOpRkLQD88UvgZdbD6P00dGYGvcBE';
const stripePromise: Promise<Stripe | null> = loadStripe(stripeUrl);

const ProtectedRoutes = (
  <Route
    element={
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Homepage />} />
    <Route path="Contact" element={<ContactPage />} />
    <Route path="About" element={<About />} />
    <Route path="Cart" element={<Cart />} />
    <Route
      path="CheckOut"
      element={
        <Elements stripe={stripePromise}>
          <CheckOut />
        </Elements>
      }
    />
    <Route path="LikePage" element={<LikePage />} />
    <Route path="Wishlist" element={<Wishlist />} />
    <Route path="Messages" element={<MessageNotifications />} />
    <Route
      path="UserPage"
      element={
        <DndProvider backend={HTML5Backend}>
          <UserPage />
        </DndProvider>
      }
    />
    <Route path="MyAccount" element={<MyAccount />} />
    <Route path="WebRTC" element={<WebRTC />} />
    <Route path="/:categoryName" element={<ViewByCategory />} />
    <Route path="/:categoryName/:productId" element={<ViewProductDetails />} />
    <Route path="AddNewProduct" element={<AddNewProduct />} />
    <Route path="ChatPage" element={<ChatPage />} />
    <Route path="Commentpage" element={<Commentpage />} />
    <Route path="Gg" element={<EditProducts />} />
    <Route path="*" element={<Error />} />
  </Route>
);

export default ProtectedRoutes;
