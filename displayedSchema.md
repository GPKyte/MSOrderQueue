Printer  
{  
    "name": String,  
    "model": String,  
    "status": (OPEN | BUSY | DONE),  
    "requesterName": String,  
    "itemsInProgress": [ {"fileName": String, "qty": int}, ...]
    <!-- "color": String   -->
}   

Request  
{  
    "user": String,  
    "comments": String,  
    <!-- "status": (**ORDERED** | IN_PROGRESS | COMPLETE | NOTIFIED | DELIVERED),   -->
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
    "completed": int
}  

User  
{  
    "firstName": String,  
    "lastName": String,  
    "email": String,  
    "role": (**REQUESTER** | STAFF | ADMIN)  
}  
