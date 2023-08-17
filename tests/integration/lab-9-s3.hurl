POST http://localhost:8080/v1/fragments
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: text/plain
```Hello S3!```

HTTP/1.1 415
[Captures]
url: header "Location"


HTTP/1.1 200
Content-Type: text/plain
```Hello S3!```

