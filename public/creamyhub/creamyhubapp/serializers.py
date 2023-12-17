from rest_framework import serializers
from . models import Login,Registration,caketable,Booking,Review,Wishlist,cart,order,payment


class Loginserializer(serializers.ModelSerializer):
    class Meta:
        model=Login
        fields='__all__'
    def create (self,validated_data):
        return Login.objects.create(**validated_data) 
class Registrationserializer(serializers.ModelSerializer):
    class Meta:
        model=Registration
        fields='__all__'
    def create(self,validated_data):
        return Registration.objects.create(**validated_data)

class caketableserializer(serializers.ModelSerializer):
    
    class Meta:
        model=caketable
        fields='__all__'
    def create(self,validated_data):
        return caketable.objects.create(**validated_data)            
class Bookingserializer(serializers.ModelSerializer):
    class Meta:
        model=Booking
        fields='__all__'
    def create(self,validated_data):
        return Booking.objects.create(**validated_data)
class Reviewserializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'
    def create(self,validated_data):
        return Review.objects.create(**validated_data) 
class Wishlistserializer(serializers.ModelSerializer):
    class Meta:
        model=Wishlist
        fields='__all__'
    def create(self,validated_data):
        return Wishlist.objects.create(**validated_data) 
class cartserializer(serializers.ModelSerializer):
    class Meta:
        model=cart
        fields='__all__'
    def create(self,validated_data):
        return cart.objects.create(**validated_data) 
class order_serializer(serializers.ModelSerializer):
    class Meta:
        model=order
        fields='__all__'
    def create(self,validated_data):
        return order.objects.create(**validated_data)
class payment_serializer(serializers.ModelSerializer):
    class Meta:
        model=payment
        fields='__all__'
    def create(self,validated_data):
        return order.objects.create(**validated_data)        

                               