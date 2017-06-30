# curl “https://aqueous-atoll-85096.herokuapp.com” \
curl "https://aqueous-atoll-85096.herokuapp.com"
  --include \
  --request POST \
  --data-urlencode “credentials[email]=$EMAIL” \
  --data-urlencode “credentials[password]=$PASSWORD” \
  --data-urlencode “credentials[password_confirmation]=$PASSWORD”
