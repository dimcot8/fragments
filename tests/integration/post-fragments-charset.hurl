POST http://localhost:8080/v1/fragments
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: text/plain; charset=utf-8

`This is a fragment`

HTTP/1.1 415
[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$.fragment.type" == "text/plain; charset=utf-8"

