curl "http://httpbin.org/delete?id=$ID" \
  --include \
  --request DELETE

# data output from curl doesn't have a trailing newline
echo
