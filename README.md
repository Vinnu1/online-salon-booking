# online-salon-booking
Online booking website integrated with firebase(auth, firestore) and instamojo(php).  

## Firestore schema
* #### Collection User(users) - consists of individual documents having -  
    1. address - String 
    2. dob - Number (unix timestamp)
    3. email - String
    4. gender - String (m/f/o)
    5. phone - Number
    6. previous_order - Array of strings
    7. registered_date - Number (unix timestamp)
    8. name - String  
* #### Collection Salon(salons) - consists of individual documents having - 
    1. address - String
    2. areas - Array of Strings
    3. name - String
    4. number - Number
    * Sub collection services having -
        1. category - String (Hair/Makeup/Beauty/Spa/Body/Handfeet)
        2. name - String
        3. salon_cost - Number
