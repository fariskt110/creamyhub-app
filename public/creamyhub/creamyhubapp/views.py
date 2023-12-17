from django.db.models import Sum
from django.shortcuts import render
from.serializers import Loginserializer,Registrationserializer,caketableserializer,Bookingserializer,Reviewserializer,Wishlistserializer,cartserializer,order_serializer,payment_serializer
from.models import Login,Registration,caketable,Booking,Review,Wishlist,cart,order,payment
from.mail import sendmail
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from .qr import Generateqr
import random
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from rest_framework.generics import DestroyAPIView
from .date import senddate


global otp,emailid


# Create your views here.

class UserRegistrationAPIView(GenericAPIView):
    serializer_class= Registrationserializer
    serializer_class_login=Loginserializer
    def post(self,request):
        login_id=''
        Name=request.data.get("Name")
        email=request.data.get("email")
        Phoneno=request.data.get("Phoneno")
        password=request.data.get("password")
        role="user" 
      
        
        if(Login.objects.filter(username=email)):
            return Response({'message':'Duplicate Username Found'},status.HTTP_400_BAD_REQUEST)
        else:
            serializer_login= self.serializer_class_login(data={'username':email,'password':password,'role':role})
        if serializer_login.is_valid():
            Log = serializer_login.save()
            login_id = Log.id
            print(login_id,"smndsnksk")
        serializer = self.serializer_class(
            data = {
                'Name':Name,
                'email':email,
                'Phoneno':Phoneno,
                'password':password,
                'Loginid':login_id,
                
            }
        )
        print(serializer)   
        if serializer.is_valid():
            print("ok")
            serializer.save()
            return Response({'data':serializer.data,'message':'Registration sucessful','sucess':True},status=status.HTTP_201_CREATED)
        return Response({'data':serializer.errors,'message':'Registration Failed','sucess':False},status=status.HTTP_400_BAD_REQUEST)    
                
class LoginAPIVIEW(GenericAPIView):
    serializer_class_login=Loginserializer
    def post(self,request):
        
    
        username=request.data.get('username')
        password=request.data.get('password')
        user_id= ""


        logreg=Login.objects.filter(username=username, password= password)
        if(logreg.count()>0):
            read_serializer = Loginserializer(logreg, many=True)
            for i in read_serializer.data:
                login_id=i['id']
                role=i['role']
                print(id)
            reg_data = Registration.objects.filter( Loginid= login_id).values()
            for i in reg_data:
               Name=i['Name']
               user_id=i['id']
               print(Name,user_id)
                
            print(reg_data)
                
            print("loginsucessfull")
            return Response({
                'data':{
                    'login_id':login_id,
                    'username':username,
                    'password':password,
                    'user_id':user_id,
                    'role':role,
                    'Name':Name,
                    
                    
                    
                    
                },
                'success':True,
                'message':'Logged In Successfully'
            },status=status.HTTP_200_OK)
        else:
            return Response({'message':' Login Failed invalid username or password','sucesss':False},status=status.HTTP_400_BAD_REQUEST)            

class Get_All_user(GenericAPIView):
    serializer_class=Registrationserializer
    def get(self,request):
        queryset = Registration.objects.all()
        if(queryset.count()>0):
            serializer=Registrationserializer(queryset,many=True)
            return Response({'data':serializer.data,'message':'all user data set','sucess':True},status=status.HTTP_200_OK)
        else:
            return Response({'data':'non data available','sucess':False},status = status.HTTP_201_CREATED)        

class Get_Single_user(GenericAPIView):
    serializer_class=Registrationserializer
    def get(self,request,id):
        queryset = Registration.objects.get(pk=id)
        serializer=Registrationserializer(queryset)
        return Response({'data':serializer.data,'message':'single user data set','sucess':True},status=status.HTTP_200_OK)
class Update_userAPIview(GenericAPIView):
    serializer_class=Registrationserializer
    def put(self,request,id):
        queryset = Registration.objects.get(pk=id)
        print(queryset)
        serializer = Registrationserializer(instance = queryset,data=request.data,partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'updated sucessfully','sucess':True},status= status.HTTP_200_OK)
        else:
            return Response({'data':'something went wrong','sucess':False},status=status.HTTP_200_OK)     
class Delete_userAPIView(GenericAPIView):
    def delete(self,request,id):
        delproduct= Registration.objects.get(pk=id) 
        delproduct.delete()
        return Response({'message':'Deleted sucessfully','sucess':True}, status=status.HTTP_200_OK)
class UserSearchAPIView(GenericAPIView):
    def post(self,request):
        query = request.data.get('query')
        print(query)
        
        i = Registration.objects.filter(Name__icontains=query) 
        for dta in i:
            print(dta)
        
        data= [{'Name':info.Name,'Phoneno':info.Phoneno,'Email':info.Email,' password': info. password,'Loginid':info.Loginid } for info in i]
        return Response({'data': data, 'message':'sucessfully fetched','sucess': True}, status=status.HTTP_200_OK)               
class caketableAPIView(GenericAPIView):
    serializer_class = caketableserializer

    def post(self,request):
      cakename= request.data.get('cakename')
      cakeprice=request.data.get('cakeprice')
      cakecategory=request.data.get('cakecategory')
      brand=request.data.get('brand')
      image=request.data.get('image')
      user_id=request.data.get('user_id')
        
        
      serializer=self.serializer_class(data={'cakename':cakename, 'cakeprice':cakeprice,'cakecategory':cakecategory,'brand': brand,'image':image,'user_id':user_id})
      print(serializer)
      if serializer.is_valid():
          serializer.save()
          return Response({'data':serializer.data,'message':'product added sucessfully','sucess':True}, status = status.HTTP_201_CREATED)
      return Response({'data':serializer.errors, 'message':'Failed','sucess':False }, status =status.HTTP_400_BAD_REQUEST) 
class Get_All_cakes(GenericAPIView):
    serializer_class = caketableserializer
    def get(self,request):
        queryset = caketable.objects.all()
        if(queryset.count()>0):
            serializer =caketableserializer(queryset,many=True)
            return Response({'data':serializer.data,'message': 'all product data set','sucess': True}, status= status.HTTP_200_OK)
        else:
            return Response({'data':'non data available','sucess':False}, status = status.HTTP_201_CREATED)
class  Get_single_cake(GenericAPIView):
    def get(self,request,id):
        queryset = caketable.objects.get(pk=id)
        serializer =caketableserializer(queryset)
        return Response({'data':serializer.data,'message':'single Product data set','sucess':True},status=status.HTTP_200_OK)
class Update_cakerecordAPIview(GenericAPIView):
    serializer_class=caketableserializer
    def put(self,request,id):
        queryset = caketable.objects.get(pk=id)
        print(queryset)
        serializer = caketableserializer(instance = queryset,data=request.data,partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'updated sucessfully','sucess':True},status= status.HTTP_200_OK)
        else:
            return Response({'data':'something went wrong','sucess':False},status=status.HTTP_200_OK)    
class cakeSearchAPIView(GenericAPIView):
    def post(self, request):
        query = request.data.get('query')
        print(query)
        
        queryset = caketable.objects.filter(cakecategory__icontains=query) | caketable.objects.filter(cakename__icontains=query)
    
        serializer = caketableserializer(queryset, many=True)
        data = serializer.data

        # Include the image field in the response
        for cake_data in data:
            cake_data['image_url'] = request.build_absolute_uri(cake_data['image'])

        return Response({'data': data, 'message': 'successfully fetched', 'success': True}, status=status.HTTP_200_OK)
#delete view
class Delete_cakeAPIView(GenericAPIView):
    def delete(self,request,id):
        delproduct= caketable.objects.get(pk=id)
        delproduct.delete()
        return Response({'message':'Deleted sucessfully','sucess':True}, status=status.HTTP_200_OK) 
class AddReviewAPIView(GenericAPIView):
    serializer_class=Reviewserializer
    def post(self,request): 
                    
        productid = request.data.get('productid')
        cakename=""
        userid=request.data.get('userid')
        # username=""
        review=request.data.get('review')
        addreview =caketable.objects.filter(id= productid ).values()
        print(addreview)
        for i in addreview:
           cakename=i['cakename']
           print(cakename)
        adduserid =Registration.objects.filter(id= userid ).values()
        print(adduserid)
        for i in adduserid:
        #    username=i['Name']
           print(username)
        
        serializer=self.serializer_class(data={'productid':productid, 'cakename':cakename,'userid':userid,'review':review })
        print(serializer)
        if serializer.is_valid():
          serializer.save()
          return Response({'data':serializer.data,'message':'product added sucessfully','sucess':True}, status = status.HTTP_201_CREATED)
        return Response({'data':serializer.errors, 'message':'Failed','sucess':False }, status =status.HTTP_400_BAD_REQUEST)
class AlluserReviewAPIView(GenericAPIView):
        serializer_class = Reviewserializer
        def get(self,request):
         queryset = Review.objects.all()
         if(queryset.count()>0):
          serializer =Reviewserializer(queryset,many=True)
          return Response({'data':serializer.data,'message': 'all review data set','sucess': True}, status= status.HTTP_200_OK)
         else:
          return Response({'data':'non data available','sucess':False}, status = status.HTTP_201_CREATED)
class Single_userreviewAPIView(GenericAPIView):
   serializer_class=Reviewserializer
   def get(self,request,id):
       queryset = Review.objects.get(pk=id)
       serializer =Reviewserializer(queryset)
       return Response({'data':serializer.data,'message':'single Review data set','sucess':True},status=status.HTTP_200_OK)       
class Update_userreviewAPIview(GenericAPIView):
    serializer_class=Reviewserializer
    def put(self,request,id):
        queryset = Review.objects.get(pk=id)
        print(queryset)
        serializer = Reviewserializer(instance = queryset,data=request.data,partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'updated sucessfully','sucess':True},status= status.HTTP_200_OK)
        else:
            return Response({'data':'something went wrong','sucess':False},status=status.HTTP_200_OK)
class Delete_userreviewAPIView(GenericAPIView):
    def delete(self,request,id):
        delproduct= Review.objects.get(pk=id)
        delproduct.delete()
        return Response({'message':'Deleted sucessfully','sucess':True}, status=status.HTTP_200_OK)
class bookingAPIView(GenericAPIView):
    
    serializer_class=Bookingserializer
    def post(self,request): 
                    
        productid = request.data.get('productid')
        cakename=""
        cakeprice=""
        userid=request.data.get('userid')
        username=""
        Status=request.data.get('status')
        booking=request.data.get('booking')
        
        addreview =caketable.objects.filter(id= productid ).values()
        print(addreview)
        for i in addreview:
           cakename=i['cakename']
           cakeprice=i['cakeprice']
           print(cakename)
           print(cakeprice)
        adduserid =Registration.objects.filter(id= userid ).values()
        print(adduserid)
        # for i in adduserid:
        #    username=i['Name']
        #    print(username)
        
        serializer=self.serializer_class(data={'productid':productid, 'cakename':cakename,'userid':userid,'Status':Status,'cakeprice':cakeprice,'booking':booking })
        print(serializer)
        if serializer.is_valid():
          serializer.save()
          return Response({'data':serializer.data,'message':'booking added sucessfully','sucess':True}, status = status.HTTP_201_CREATED)
        return Response({'data':serializer.errors, 'message':'Failed','sucess':False }, status =status.HTTP_400_BAD_REQUEST)
class AllbookingAPIView(GenericAPIView):
        serializer_class = Bookingserializer
        def get(self,request):
         queryset = Booking.objects.all()
         if(queryset.count()>0):
          serializer =Bookingserializer(queryset,many=True)
          return Response({'data':serializer.data,'message': 'all review data set','sucess': True}, status= status.HTTP_200_OK)
         else:
          return Response({'data':'non data available','sucess':False}, status = status.HTTP_201_CREATED)
class Single_bookingAPIView(GenericAPIView):
   serializer_class=Bookingserializer
   def get(self,request,id):
       queryset = Booking.objects.get(pk=id)
       serializer =Bookingserializer(queryset)
       return Response({'data':serializer.data,'message':'single Review data set','sucess':True},status=status.HTTP_200_OK)
   def delete(self,request,id):
        delproduct=Booking.objects.get(pk=id)
        delproduct.delete()
        return Response({'message':'Deleted sucessfully','sucess':True}, status=status.HTTP_200_OK)        
                                                                        
class add_wishlist_api(GenericAPIView):
    serializer_class=Wishlistserializer
    def post(self,request):
        user_id=request.data.get('user_id')
        print(user_id)
        cakeid=request.data.get('cakeid')
        print(cakeid)
        cakename=""    
        cakeprice=""
        cakecategory=""
        image=""
        username=""
        brand=""
        Cdata=caketable.objects.filter(id=cakeid).values()
        for i in Cdata:
          cakename=i['cakename']
          cakeprice=i['cakeprice']
          cakecategory=i['cakecategory']
          image=i['image']
          brand=i['brand']
        #   print(cakename)
        #   print(brand)

        Udata=Registration.objects.filter(id=user_id).values()
        # print(Udata)
        for i in Udata:
            username=i['Name'] 
        

        serializer=self.serializer_class(data={'userid':user_id,'cakeid':cakeid,'cakename':cakename,'cakeprice':cakeprice,'cakecategory':cakecategory,'brand':brand,'image':image,'username':username})   
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':"save your wishlist",'sucess':True},status = status.HTTP_201_CREATED)
        return Response({'data':serializer.errors, 'message':'Failed','sucess':False}, status=status.HTTP_400_BAD_REQUEST) 
class ViewwishlistReviewAPIView(GenericAPIView):
    serializer_class=Wishlistserializer
    def get(self,request,id):
        queryset=Wishlist.objects.filter(userid=id).values()
        print(queryset)
        if(queryset.count()>0) :
            serializer=Wishlistserializer(queryset,many=True)
            return Response({'data':serializer.data,'message':"View wishlist",'sucess':True},status = status.HTTP_201_CREATED)
        else:
            return Response({'data':[],'sucess':False}, status =status.HTTP_201_CREATED)          
class Delete_wishlistviewAPIView(GenericAPIView):
    def delete(self, request, id):
        try:
            delproduct = Wishlist.objects.get(pk=id)
            delproduct.delete()
            return Response({'message': 'Deleted successfully', 'success': True}, status=status.HTTP_200_OK)
        except Wishlist.DoesNotExist:
            return Response({'message': 'Wishlist item not found', 'success': False}, status=status.HTTP_404_NOT_FOUND)
class Add_cartviewAPIView(GenericAPIView):
    serializer_class=cartserializer
    def post(self,request):
        cakeid=request.data.get('cakeid')
        user_id=request.data.get('userid')
        quantity=request.data.get('quantity')
        qty=int(quantity)
        print('Request Data:', request.data)
        print('USERId', user_id)

        # print(type(qty))
        cartstatus="0"
        cakename=""
        cakeprice=""
        cakecategory=""
        image=""
        brand=""
        username=""
        # totalprice=request.data.get('totalprice')
        product_data=caketable.objects.filter(id=cakeid).values()
        for i in product_data:
            cakename=i['cakename']
            
            cakeprice=i['cakeprice']
            # print(cakeprice)
            cakecategory=i['cakecategory']
            image=i['image']
            brand=i['brand']  
            cakeprices=int(cakeprice)
            # print(type(cakeprices))
            totalprice=cakeprices*qty 
            
        Udata=Registration.objects.filter(id=user_id).values()
            # print(Udata)
        for i in Udata:
            username=i['Name']      
        serializer=self.serializer_class(data={'userid':user_id,'cakeid':cakeid,'cakename':cakename,'cakeprice':cakeprices,'cakecategory':cakecategory,'brand':brand,'image':image,'username':username,'quantity':quantity,'cartstatus':0,'totalprice':totalprice})   
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':"save your cart",'sucess':True},status = status.HTTP_201_CREATED)
        return Response({'data':serializer.errors, 'message':'Failed','sucess':False}, status=status.HTTP_400_BAD_REQUEST) 
class ViewcarteviewAPIView(GenericAPIView):
    serializer_class=cartserializer

    def get(self,request,id):
        queryset=cart.objects.filter(userid=id).values()
        # print(queryset)
        if(queryset.count()>0) :
            serializer=cartserializer(queryset,many=True)
            return Response({'data':serializer.data,'message':"View cartlist",'sucess':True},status = status.HTTP_201_CREATED)
        else:
            return Response({'data':'non data available','sucess':False}, status =status.HTTP_201_CREATED)          
class Delete_cartviewAPIView(GenericAPIView):
    def delete(self,request,id):
        delproduct= cart.objects.get(pk=id)
        delproduct.delete()
        return Response({'message':'Deleted sucessfully','sucess':True}, status=status.HTTP_200_OK)

class Update_cartviewAPIView(GenericAPIView):
    serializer_class=cartserializer
    def put(self,request,id):
        queryset=cart.objects.get(pk=id)
        # print(queryset)
        serializer=cartserializer(instance=queryset,data=request.data,partial=True)
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'updated sucessfully','sucess':True},status= status.HTTP_200_OK)
        else:
            return Response({'data':'something went wrong','sucess':False},status=status.HTTP_200_OK)    

class generateqr_api(GenericAPIView):

    def post(self, request):
        grandtotal = request.data.get('grandtotal')
        print(grandtotal)
        Generateqr(grandtotal)
        return Response({'message': 'QR Generated  successfully', 'success': 1}, status=status.HTTP_200_OK)
class PlaceOrderAPIView(GenericAPIView):
    serializer_class = order_serializer

    def post(self, request):
        user1 = request.data.get('userid')

        with transaction.atomic():
            # Fetch cart items
            queryset = cart.objects.filter(userid=user1).values()

            # Calculate total
            tot = queryset.aggregate(total=Sum('totalprice'))['total']
            total = str(tot)
            print("===total", total)

            order_data = []
            for item in queryset:
                order_data.append({
                    'userid': user1,
                    'cakename': item['cakename'],
                    'cakeid': item['cakeid'],
                    'image': item['image'],
                    'totalprice': item['totalprice'],
                    'orderstatus': "0",
                    "order_status": "0",
                    'cakecategory': item['cakecategory'],
                    'quantity': item['quantity'],
                    'username': item['username'],
                    'cakeprice': item['cakeprice']
                })

            # Save order
            serializer = self.serializer_class(data=order_data, many=True)
            if serializer.is_valid():
                serializer.save()

                # Delete items from cart after placing the order
                cart.objects.filter(userid=user1).delete()

                return Response({'data': serializer.data, 'message': "Order placed successfully", 'success': True},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({'data': serializer.errors, 'message': 'Failed to place order', 'success': False},
                                status=status.HTTP_400_BAD_REQUEST)

class view_orderAPIView(GenericAPIView):
    serializer_class=order_serializer

    def get(self,request,id):
        queryset=order.objects.filter(userid=id).values()
        # print(queryset)
        if(queryset.count()>0) :
            serializer=order_serializer(queryset,many=True)
            return Response({'data':serializer.data,'message':"View order list",'sucess':True},status = status.HTTP_201_CREATED)
        else:
            return Response({'data':'non data available','sucess':False}, status =status.HTTP_201_CREATED)

class DeleteOrderAPIView(GenericAPIView):
    def delete(self,request,id):

        delproduct= order.objects.filter(userid=id)
        for i in delproduct:
           i.delete()

        
        return Response({'message':'Deleted sucessfully','sucess':True}, status=status.HTTP_200_OK)
    


class GetpasswordAPIVIEW(GenericAPIView):
    def post(self, request):
        global emailid
        emailid=request.data.get("Email")
        global otp
       
        otp=(random.randint(111111, 999999))
        
      
        sendmail(emailid,otp)

        return Response({'message': ' successfully', 'success': True}, status=status.HTTP_200_OK)
    
class otpverificationAPIView(GenericAPIView):
    def post(self, request):
        global otp
        votp=request.data.get("otp1")
        print(votp,otp)

        if(votp==otp):
            print("otp verified")
        else:("otp not verified")

        

        

        return Response({'message': ' Otp Verfied ', 'success': True}, status=status.HTTP_200_OK)
class Update_passwordAPIView(GenericAPIView):
        serializer_class=Loginserializer
        def put(self,request):
          queryset=Login.objects.get(username=emailid)
        # print(queryset)
          serializer=Loginserializer(instance=queryset,data=request.data,partial=True)
        # print(serializer)
          if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'password updated sucessfully','sucess':True},status= status.HTTP_200_OK)
          else:
            return Response({'data':'something went wrong','sucess':False},status=status.HTTP_400_BAD_REQUEST)   

class UserSearchAPIView(GenericAPIView):
    def post(self, request):
        query = request.data.get("query")
        print(query)

        results = caketable.objects.filter(cakename__icontains=query)
      
        serializer = caketableserializer(results, many=True)

        return Response({"data": serializer.data, "message": "Search successful", "success": True}, status=status.HTTP_200_OK)
class paymentAPIView(GenericAPIView):
    serializer_class=payment_serializer
    def post(self,request):
        userid=request.data.get("userid")
        grandtotal=request.data.get('grandtotal')
        paymentcompleted="your payment completed"
        orderstatus="1" 
        id=(random.randint(1111, 2222))
        ID=(random.randint(3333,4444))
        Total=(id+ID)
        



    
# from datetime import datetime
# import pytz
# import random
# local_timezone = pytz.timezone('Asia/Kolkata')  # Replace 'Asia/Kolkata' with your desired timezone
# current_datetime = datetime.now(local_timezone)
    
#     # Format the local date and time as a string
# date_time_str = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    
#     # Include date and time in the note
# note = f'Company - {date_time_str}'
# print(note)
# id=(random.randint(1111, 2222))
# ID=(random.randint(3333,4444))
# Total=id+ID
# print(Total)
# userid=6;
# grandtotal="#"+str(54545);

# paymentcompleted="thanks"
# print(grandtotal)
# print(userid)




