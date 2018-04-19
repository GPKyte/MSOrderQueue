Printer  
{  
  &nbsp;&nbsp;"id": String, // Generated not provided  
  &nbsp;&nbsp;"name": String,  
  &nbsp;&nbsp;"brand": String,  
  &nbsp;&nbsp;"model": String,  
  &nbsp;&nbsp;"status": (OPEN | BUSY | DONE),  
  &nbsp;&nbsp;"requestId": String // Deprecated  
}  

Request  
{  
  &nbsp;&nbsp;"id": String, // Generated not provided  
  &nbsp;&nbsp;"user": String,  
  &nbsp;&nbsp;"comments": String,  
  &nbsp;&nbsp;"timestamp": Date, // Generated not provided  
  &nbsp;&nbsp;"status": (**ORDERED** | IN_PROGRESS | COMPLETE | NOTIFIED | DELIVERED),  
  &nbsp;&nbsp;"forClass": true | false,  
  &nbsp;&nbsp;"requestItems": [  
    &nbsp;&nbsp;&nbsp;&nbsp; RequestItem, ...  
  &nbsp;&nbsp;]  
}  

RequestItem  
{  
  &nbsp;&nbsp;"fileName": String,  
  &nbsp;&nbsp;"color": String, // Deprecated  
  &nbsp;&nbsp;"qty": int,  
  &nbsp;&nbsp;"status": (**ORDERED** | IN_PROGRESS | COMPLETE)  
}  

User  
{  
  &nbsp;&nbsp;"firstName": String,  
  &nbsp;&nbsp;"lastName": String,  
  &nbsp;&nbsp;"username": String, // Deprecating  
  &nbsp;&nbsp;"email": String,  
  &nbsp;&nbsp;"role": (**REQUESTER** | STAFF | ADMIN), // Requires equal or higher privileges to create new user  
}  
