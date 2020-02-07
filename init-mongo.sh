#!/usr/bin/env bash

echo 'Creating application user and db';

mongo lonersappdb     --username lonersapp     --password lonersapppwd      --authenticationDatabase admin     --host localhost     --port 27017      --eval "db.createUser({user: 'lonersapp', pwd: 'lonersapppwd', roles:[{role:'dbOwner', db: 'lonersappdb'}]});"

echo 'User: lonersapp create to database lonersappdb';

mongo testDB     --username lonersapp     --password lonersapppwd      --authenticationDatabase admin     --host localhost     --port 27017      --eval "db.createUser({user: 'lonersapp', pwd: 'lonersapppwd', roles:[{role:'dbOwner', db: 'testDB'}]});"

echo 'User: lonersapp create to database testDB';
