#!/bin/bash

read -p "Type the USERNAME [lonersapp]: " MONGO_USERNAME
MONGO_USERNAME=${MONGO_USERNAME:-lonersapp}
echo $MONGO_USERNAME

read -p "Type the PASSWORD [lonersapppwd]: " MONGO_PASSWORD
MONGO_PASSWORD=${MONGO_PASSWORD:-lonersapppwd}
echo $MONGO_PASSWORD

MONGO_DB=lonersappdb

if [[ -z "${MONGO_USERNAME}" || -z "${MONGO_PASSWORD}"  || -z "${MONGO_DB}" ]]; then
  echo "required inputs misssing"
  echo "run: ./create_env.sh YOUR_USERNAME YOUR_PASSWORD YOUR_DATABASE"
  exit 1
fi

echo "CREATING .env FILE..."
cat > .env <<EOF
MONGO_USERNAME=${MONGO_USERNAME}
MONGO_PASSWORD=${MONGO_PASSWORD}
MONGO_DB=${MONGO_DB}
EOF
echo "created..."

echo "CREATING init-mongo.sh FILE..."
cat > init-mongo.sh <<EOF
#!/usr/bin/env bash

echo 'Creating application user and db';

mongo ${MONGO_DB} \
    --username ${MONGO_USERNAME} \
    --password ${MONGO_PASSWORD}  \
    --authenticationDatabase admin \
    --host localhost \
    --port 27017  \
    --eval "db.createUser({user: '${MONGO_USERNAME}', pwd: '${MONGO_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_DB}'}]});"

echo 'User: ${MONGO_USERNAME} create to database ${MONGO_DB}';

mongo testDB \
    --username ${MONGO_USERNAME} \
    --password ${MONGO_PASSWORD}  \
    --authenticationDatabase admin \
    --host localhost \
    --port 27017  \
    --eval "db.createUser({user: '${MONGO_USERNAME}', pwd: '${MONGO_PASSWORD}', roles:[{role:'dbOwner', db: 'testDB'}]});"

echo 'User: ${MONGO_USERNAME} create to database testDB';
EOF
echo "created..."

if [[ -d node_modules/ ]]
then
    rm -rf node_modules/
fi

mkdir node_modules/

npm install --silent

docker-compose -f docker-compose.yml up

exit 0