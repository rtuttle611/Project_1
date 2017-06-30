curl "http://httpbin.org/patch?id=${ID}" \
  --include \
  --request PATCH \
  --data-urlencode ""

# data output from curl doesn't have a trailing newline
echo
