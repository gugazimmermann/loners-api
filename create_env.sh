#!/bin/bash

# variables
MONGO_USERNAME=$1
MONGO_PASSWORD=$2
MONGO_DB=$3

# input checks
if [[ -z "${MONGO_USERNAME}" || -z "${MONGO_PASSWORD}"  || -z "${MONGO_DB}" ]]; then
  echo "required inputs misssing"
  echo "run: ./create_env.sh YOUR_USERNAME YOUR_PASSWORD YOUR_DATABASE"
  exit 1
fi

# create env file
echo "CREATING .env FILE..."
cat > .env <<EOF
MONGO_USERNAME=${MONGO_USERNAME}
MONGO_PASSWORD=${MONGO_PASSWORD}
MONGO_DB=${MONGO_DB}
EOF
echo "created..."

# create init mongo file
echo "CREATING init-mongo.js FILE..."
cat > init-mongo.js <<EOF
db.createUser(
    {
        user: "${MONGO_USERNAME}",
        pwd: "${MONGO_PASSWORD}",
        roles: [
            {
                role: "readWrite",
                db: "${MONGO_DB}"
            }
        ]
    }
);
EOF
echo "created..."


docker-compose -f docker-compose.yml up

exit 0