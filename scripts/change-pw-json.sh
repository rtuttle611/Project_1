curl "http://httpbin.org/patch?id=${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data ""

# data output from curl doesn't have a trailing newline
echo
