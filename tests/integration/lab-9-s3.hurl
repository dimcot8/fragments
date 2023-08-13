POST http://localhost:8080/v1/fragments
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: text/plain
```Hello S3!```

HTTP/1.1 201
[Captures]
url: header "Location"

# Step 2: GET the created fragment
GET {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

HTTP/1.1 200
Content-Type: text/plain
```Hello S3!```

# Step 4: Try to GET the fragment again (should return 404)
GET {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

