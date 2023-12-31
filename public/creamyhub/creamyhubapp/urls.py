from django.urls import path
from. import views

urlpatterns = [
    path('UserRegistrationAPIView',views.UserRegistrationAPIView.as_view(),name='userRegistrationAPIView'),
    path('LoginAPIVIEW',views.LoginAPIVIEW.as_view(),name='LoginAPIVIEW'),
    path('Get_All_user',views.Get_All_user.as_view(),name='Get_All_user'),
    path('Get_Single_user/<int:id>',views.Get_Single_user.as_view(),name='Get_Single_user'),
    path('Update_userAPIview/<int:id>',views.Update_userAPIview.as_view(),name='Update_userAPIview'),
    path('Delete_userAPIView/<int:id>',views.Delete_userAPIView.as_view(),name='Delete_userAPIView'),
    path('UserSearchAPIView',views.UserSearchAPIView.as_view(),name='UserSearchAPIView'),
    path('caketableAPIView',views.caketableAPIView.as_view(),name='caketableAPIView'),
    path('Get_All_cakes',views.Get_All_cakes.as_view(),name='Get_All_cakesAPIView'),
    path('Get_single_cake/<int:id>',views.Get_single_cake.as_view(),name='Get_single_cake'),
    path('Update_cakerecordAPIview/<int:id>',views.Update_cakerecordAPIview.as_view(),name='Update_productrecordAPIview'),
    path('cakeSearchAPIView',views.cakeSearchAPIView.as_view(),name='cakeSearchAPIView'),
    path('Delete_cakeAPIView/<int:id>',views.Delete_cakeAPIView.as_view(),name='Delete_cakeAPIView'),
    path('AddReviewAPIView',views.AddReviewAPIView.as_view(),name='AddReviewAPIView'),
    path('AlluserReviewAPIView',views.AlluserReviewAPIView.as_view(),name='AlluserReviewAPIView'),
    path('Single_userreviewAPIView/<int:id>',views.Single_userreviewAPIView.as_view(),name='Single_userreviewAPIView'),
    path(' Update_userAPIview/<int:id>',views.Update_userAPIview.as_view(),name=' Update_userAPIview'),
    path('Delete_userAPIView/<int:id>',views.Delete_userAPIView.as_view(),name='Delete_userAPIView'),     
    path('bookingAPIView',views.bookingAPIView.as_view(),name='bookingAPIView'),
    path('AllbookingAPIView',views.AllbookingAPIView.as_view(),name='AllbookingAPIView'),
    path('Single_bookingAPIView/<int:id>',views.Single_bookingAPIView.as_view(),name='Single_bookingAPIView'),
    path('add_wishlist_api',views.add_wishlist_api.as_view(),name='add_wishlist_api'),
    path('ViewwishlistReviewAPIView/<int:id>',views.ViewwishlistReviewAPIView.as_view(),name='ViewwishlistReviewAPIView'),
    path('Delete_wishlistviewAPIView/<int:id>',views.Delete_wishlistviewAPIView.as_view(),name='Delete_wishlistviewAPIView'),
    path('Add_cartviewAPIView',views.Add_cartviewAPIView.as_view(),name='Add_cartviewAPIView'),
    path('ViewcarteviewAPIView/<int:id>',views.ViewcarteviewAPIView.as_view(),name='ViewcarteviewAPIView'),
    path('Delete_cartviewAPIView/<int:id>',views.Delete_cartviewAPIView.as_view(),name='Delete_cartviewAPIView'),
    path('Update_cartviewAPIView/<int:id>',views.Update_cartviewAPIView.as_view(),name='Update_cartviewAPIView'), 
    path('generateqr_api',views.generateqr_api.as_view(),name='generateqr_api'),
    path('Add_cartviewAPIView',views.Add_cartviewAPIView.as_view(),name='Add_cartviewAPIView'),
    path('DeleteOrderAPIView/<int:id>',views.DeleteOrderAPIView.as_view(),name='DeleteOrderAPIView'),
     path('PlaceOrderAPIView',views.PlaceOrderAPIView.as_view(),name='PlaceOrderAPIView'),
    path('view_orderAPIView/<int:id>',views.view_orderAPIView.as_view(),name='view_orderAPIView'),
    path('GetpasswordAPIVIEW',views.GetpasswordAPIVIEW.as_view(),name="GetpasswordAPIVIEW"),
    path('otpverificationAPIView',views.otpverificationAPIView.as_view(),name='otpverificationAPIView'),
    path('UserSearchAPIView',views.UserSearchAPIView.as_view(), name="UserSearchAPIView"),
    path('Update_passwordAPIView',views.Update_passwordAPIView.as_view(),name="Update_passwordAPIView"),
    path("paymentAPIView",views.paymentAPIView.as_view(),name="paymentAPIView"),
    path('view_paymentAPIView/<int:id>',views.view_paymentAPIView.as_view(),name='view_paymentAPIView')
]
