from django.db import models

# Create your models here.

class Login(models.Model):
    username=models.CharField(max_length=250)
    password=models.CharField(max_length=250)
    role=models.CharField(max_length=10)
    # Name=models.CharField(max_length=50)
    def __str__(self):
        return self.username

    
class Registration(models.Model):
    Name=models.CharField(max_length=250)
    Phoneno=models.CharField(max_length=250)
    email=models.CharField(max_length=250)
    password=models.CharField(max_length=250)
    adress=models.CharField(max_length=300,null=True,blank=True)
    location=models.CharField(max_length=200,null=True,blank=True)
    pincode=models.CharField(max_length=6,null=True,blank=True)
    Loginid=models.ForeignKey(Login,on_delete=models.CASCADE)   
    def __str__(self):
        return self.Name  
        
    
class caketable(models.Model):
    cakename=models.CharField(max_length=250)
    cakeprice=models.CharField(max_length=250)
    cakecategory=models.CharField(max_length=250)
    brand=models.CharField(max_length=250)
    image=models.ImageField(upload_to='images/',null=True,blank=True)

class Booking(models.Model):
    cakeid=models.CharField(max_length=250)
    cakename=models.CharField(max_length=250)
    userid=models.CharField(max_length=250)
    username=models.CharField(max_length=250)
    booking=models.CharField(max_length=250)
    image=models.ImageField(upload_to='images/',null=True)
    Status=models.CharField(max_length=250)      
    
class Review(models.Model):
    productid=models.CharField(max_length=250)
    cakename=models.CharField(max_length=250)
    userid=models.CharField(max_length=250)
    username=models.CharField(max_length=250)
    image=models.ImageField(upload_to='images/',null=True)
    comment=models.CharField(max_length=250)    

class Wishlist(models.Model):
    cakeid=models.CharField(max_length=200)
    userid=models.CharField(max_length=200)
    cakename=models.CharField(max_length=200)
    cakeprice=models.CharField(max_length=200)
    image=models.CharField(max_length=200)
    cakecategory=models.CharField(max_length=200)
    username=models.CharField(max_length=200)


    def __str__(self):
        return self.userid

class cart(models.Model):
    cakeid=models.CharField(max_length=200)
    userid=models.CharField(max_length=200)
    quantity=models.CharField(max_length=200)
    cakeprice=models.CharField(max_length=200)
    image=models.CharField(max_length=200)
    cakecategory=models.CharField(max_length=200)
    cartstatus=models.CharField(max_length=200)
    totalprice=models.CharField(max_length=200)
    username=models.CharField(max_length=200)
    cakename=models.CharField(max_length=200)
    
def __str__(self):
    return self.userid

class order(models.Model):
    user=models.CharField(max_length=200)
    totel=models.CharField(max_length=200)
    pstatus=models.CharField(max_length=200)
    adress=models.CharField(max_length=200)
    Name=models.CharField(max_length=250)
    Phoneno=models.CharField(max_length=250)
    location=models.CharField(max_length=200,null=True,blank=True)
    pincode=models.CharField(max_length=6,null=True,blank=True)
   
