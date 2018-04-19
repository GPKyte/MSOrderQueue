Printer  
{  
    "id": String, // Generated not provided  
    "name": String,  
    "brand": String,  
    "model": String,  
    "status": (OPEN | BUSY | DONE),  
    "requestId": String // Deprecated  
}  

Request  
{  
    "id": String, // Generated not provided  
    "user": String,  
    "comments": String,  
    "timestamp": Date, // Generated not provided  
    "status": (**ORDERED** | IN_PROGRESS | COMPLETE | NOTIFIED | DELIVERED),  
    "forClass": true | false,  
    "requestItems": [  
           RequestItem, ...  
    ]  
}  

RequestItem  
{  
    "fileName": String,  
    "color": String, // Deprecated  
    "qty": int,  
    "status": (**ORDERED** | IN_PROGRESS | COMPLETE)  
}  

User  
{  
    "firstName": String,  
    "lastName": String,  
    "username": String, // Deprecating  
    "email": String,  
    "role": (**REQUESTER** | STAFF | ADMIN), // Requires equal or higher privileges to create new user  
}  
