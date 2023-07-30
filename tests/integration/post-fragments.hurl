# Authenticated POST should succeed
# Authenticate as user1@email.com:password1

POST http://localhost:8080/v1/fragments
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: text/plain
```This is a fragment```

HTTP/1.1 201
[Asserts]
header "Location" matches "http:\/\/localhost:8080\/v1\/fragments\/[A-Za-z0-9_-]+"
# header "Location" matches "^http:\/\/localhost:8080\/v1\/fragments\/[A-Za-z0-9_-]+$"
jsonpath "$.status" == "ok"
jsonpath "$.fragment.id" matches "[A-Za-z0-9_-]+"
jsonpath "$.fragment.type" == "text/plain"
jsonpath "$.fragment.ownerId" matches "[0-9a-fA-F]{8}"
jsonpath "$.fragment.size" == 18
# created and updated should be ISO DateTime Strings (e.g., "2021-11-02T15:09:50.403Z")
jsonpath "$.fragment.created" matches "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z"
jsonpath "$.fragment.updated" matches "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z"
