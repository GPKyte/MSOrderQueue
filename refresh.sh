curl -X POST localhost:8080/api/printers -d '{"name": "Sully", "brand": "MakerBot", "model": "5th Gen Replicator", "status": "OPEN"}' -H "Content-Type: application/json"; echo ""
curl -X POST localhost:8080/api/printers -d '{"name": "Stitch", "brand": "MakerBot", "model": "5th Gen Replicator", "status": "BUSY"}' -H "Content-Type: application/json"; echo ""
curl -X POST localhost:8080/api/printers -d '{"name": "Tiny", "brand": "MakerBot", "model": "Z-18", "status": "OPEN"}' -H "Content-Type: application/json"; echo ""

curl -X POST localhost:8080/api/requests -d '{"user": "kyteg", "forClass": true, "requestItems": [{"fileName": "AppleBottom.stl", "color": "red", "qty": 1},{"fileName": "BootsWFur.stl", "color": "black", "qty": 2},{"fileName": "Club.stl", "color": "any", "qty": 1}] }' -H "Content-Type: application/json"; echo ""
curl -X POST localhost:8080/api/requests -d '{"user": "ghberemeskles", "comments": "Print this out from thingiverse https://www.thingiverse.com/", "forClass": false}' -H "Content-Type: application/json"; echo ""
curl -X POST localhost:8080/api/requests -d '{"user": "3montyjack", "comments": "Pistaccios can lower risk of heart disease", "forClass": true, "requestItems": [{"fileName": "https://www.thingiverse.com/thing:222667", "color": "blue", "qty": 2}] }' -H "Content-Type: application/json"; echo ""

curl -X POST localhost:8080/api/users -d '{"firstName": "Gavin", "lastName": "Kyte", "email": "kyteg@xavier.edu", "username": "kyteg"}' -H "Content-Type: application/json"; echo ""
curl -X POST localhost:8080/api/users -d '{"firstName": "Solomon", "lastName": "Ghberemeskle", "email": "ghberemeskles@xavier.edu", "username": "ghberemeskle"}' -H "Content-Type: application/json"; echo ""
