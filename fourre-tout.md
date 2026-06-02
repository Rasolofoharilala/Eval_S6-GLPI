curl -X POST http://localhost/api.php/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=TON_CLIENT_ID" \
  -d "client_secret=TON_CLIENT_SECRET" \
  -d "username=glpi" \
  -d "password=glpi" \
  -d "scope=api user"

  sudo mysql -u root -p mysql
CREATE DATABASE glpi;
CREATE USER 'glpi'@'localhost' IDENTIFIED BY 'glpi';
GRANT ALL PRIVILEGES ON glpi.* TO 'glpi'@'localhost';
GRANT SELECT ON `mysql`.`time_zone_name` TO 'glpi'@'localhost';
FLUSH PRIVILEGES;

sudo mv /var/www/html/glpi/config /etc/glpi
sudo mv /var/www/html/glpi/files /var/lib/glpi
sudo mv /var/lib/glpi/_log /var/log/glpi

sudo chown root:root /var/www/html/glpi/ -R
sudo chown www-data:www-data /etc/glpi -R
sudo chown www-data:www-data /var/lib/glpi -R
sudo chown www-data:www-data /var/log/glpi -R
sudo chown www-data:www-data /var/www/html/glpi/marketplace -Rf
sudo find /var/www/html/glpi/ -type f -exec chmod 0644 {} \;
sudo find /var/www/html/glpi/ -type d -exec chmod 0755 {} \;
sudo find /etc/glpi -type f -exec chmod 0644 {} \;
sudo find /etc/glpi -type d -exec chmod 0755 {} \;
sudo find /var/lib/glpi -type f -exec chmod 0644 {} \;
sudo find /var/lib/glpi -type d -exec chmod 0755 {} \;
sudo find /var/log/glpi -type f -exec chmod 0644 {} \;
sudo find /var/log/glpi -type d -exec chmod 0755 {} \;

curl -X POST http://localhost/api.php/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=CLIENT_ID" \
  -d "client_secret=CLIENT_SECRET" \
  -d "username=glpi" \
  -d "password=glpi" \
  -d "scope=api"
  
  curl -X POST http://localhost/api.php/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=e208ddaefc055f01d6f46aaf97383adb340b660e0dc990fe63b01abfd1a02af8" \
  -d "client_secret=3d9f0b7fbfd59bc87d8ed72e6c05e2b692e57c304b454055f895a11ec45b9ecf" \
  -d "username=glpi" \
  -d "password=glpi" \
  -d "scope=api"
  
  curl http://localhost/api.php/v2.3/Ticket \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlMjA4ZGRhZWZjMDU1ZjAxZDZmNDZhYWY5NzM4M2FkYjM0MGI2NjBlMGRjOTkwZmU2M2IwMWFiZmQxYTAyYWY4IiwianRpIjoiZDMzYTlhOGIwMjA0MjY0Mzk2NGY4ZWM2NmRjMjg3NzBiNzM3ZDQ3MWUxMGIxM2RkM2VlMGQ3MWEzN2ZjZGZjNjczNTMyNWJhODhhZDI1OWUiLCJpYXQiOjE3ODAzOTcyNTYuMDg4ODc4LCJuYmYiOjE3ODAzOTcyNTYuMDg4ODc5LCJleHAiOjE3ODA0MDA4NTYuMDc5NDkxLCJzdWIiOiIyIiwic2NvcGVzIjpbImFwaSJdfQ.RowX0vM81xlCCATfzM4uJeMM0cDpHNzzSlnVH8u1oT9ZQWqejgCfR1jAPvUaDDmmDZwZGSoCjF4IHgxfalae3uN5gtXSwGZpZ7YS_ro2VQqLqybInPcgQ2AGBGUXvZsLH7PWSX31VNIde_APeZX2Sk1Z5983zvWoFdKVgYf0GwvFlSYyP5o2Y5BGwKBb--6jfiFFVtZWcj9RS6uOgcX2ZZe4oYYhWwvME9WWyGBv539uUuwlXv2x7USFkYmyT35lt4kOnKR1CIrPryvNNvQwA22Nuka4HCBFyJ1yirvPx9sykPUDsRATbN9inGCM5v_B9NMez7N8uEUmTt8yQsigQA"
  
  TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlMjA4ZGRhZWZjMDU1ZjAxZDZmNDZhYWY5NzM4M2FkYjM0MGI2NjBlMGRjOTkwZmU2M2IwMWFiZmQxYTAyYWY4IiwianRpIjoiZDMzYTlhOGIwMjA0MjY0Mzk2NGY4ZWM2NmRjMjg3NzBiNzM3ZDQ3MWUxMGIxM2RkM2VlMGQ3MWEzN2ZjZGZjNjczNTMyNWJhODhhZDI1OWUiLCJpYXQiOjE3ODAzOTcyNTYuMDg4ODc4LCJuYmYiOjE3ODAzOTcyNTYuMDg4ODc5LCJleHAiOjE3ODA0MDA4NTYuMDc5NDkxLCJzdWIiOiIyIiwic2NvcGVzIjpbImFwaSJdfQ.RowX0vM81xlCCATfzM4uJeMM0cDpHNzzSlnVH8u1oT9ZQWqejgCfR1jAPvUaDDmmDZwZGSoCjF4IHgxfalae3uN5gtXSwGZpZ7YS_ro2VQqLqybInPcgQ2AGBGUXvZsLH7PWSX31VNIde_APeZX2Sk1Z5983zvWoFdKVgYf0GwvFlSYyP5o2Y5BGwKBb--6jfiFFVtZWcj9RS6uOgcX2ZZe4oYYhWwvME9WWyGBv539uUuwlXv2x7USFkYmyT35lt4kOnKR1CIrPryvNNvQwA22Nuka4HCBFyJ1yirvPx9sykPUDsRATbN9inGCM5v_B9NMez7N8uEUmTt8yQsigQA"

curl http://localhost/api.php/v2.3/status \
  -H "Authorization: Bearer $TOKEN"

curl http://localhost/api.php/v2.3/me \
  -H "Authorization: Bearer $TOKEN"
  
  TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlMjA4ZGRhZWZjMDU1ZjAxZDZmNDZhYWY5NzM4M2FkYjM0MGI2NjBlMGRjOTkwZmU2M2IwMWFiZmQxYTAyYWY4IiwianRpIjoiZDMzYTlhOGIwMjA0MjY0Mzk2NGY4ZWM2NmRjMjg3NzBiNzM3ZDQ3MWUxMGIxM2RkM2VlMGQ3MWEzN2ZjZGZjNjczNTMyNWJhODhhZDI1OWUiLCJpYXQiOjE3ODAzOTcyNTYuMDg4ODc4LCJuYmYiOjE3ODAzOTcyNTYuMDg4ODc5LCJleHAiOjE3ODA0MDA4NTYuMDc5NDkxLCJzdWIiOiIyIiwic2NvcGVzIjpbImFwaSJdfQ.RowX0vM81xlCCATfzM4uJeMM0cDpHNzzSlnVH8u1oT9ZQWqejgCfR1jAPvUaDDmmDZwZGSoCjF4IHgxfalae3uN5gtXSwGZpZ7YS_ro2VQqLqybInPcgQ2AGBGUXvZsLH7PWSX31VNIde_APeZX2Sk1Z5983zvWoFdKVgYf0GwvFlSYyP5o2Y5BGwKBb--6jfiFFVtZWcj9RS6uOgcX2ZZe4oYYhWwvME9WWyGBv539uUuwlXv2x7USFkYmyT35lt4kOnKR1CIrPryvNNvQwA22Nuka4HCBFyJ1yirvPx9sykPUDsRATbN9inGCM5v_B9NMez7N8uEUmTt8yQsigQA"

curl http://localhost/api.php/v2.3/Administration/User/Me \
  -H "Authorization: Bearer $TOKEN"

curl http://localhost/api.php/v2.3/Assistance/Ticket \
  -H "Authorization: Bearer $TOKEN"


