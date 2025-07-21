#!/bin/bash

echo "Waiting for MongoDB to start..."
until nc -z localhost 27017; do
  echo "Waiting for MongoDB to be ready..."
  sleep 1
done

echo "Checking replica set status..."
if mongosh --host localhost --eval "rs.status().ok" | grep -q "true"; then
  echo "Replica set already initiated. Skipping rs.initiate()."
else
  echo "Initiating replica set..."
  mongosh --host localhost --eval "rs.initiate()"
fi

echo "Waiting for replica set to be ready and primary..."
until mongosh --host localhost --eval "rs.status().ok && rs.isMaster().ismaster" | grep -q "true"; do
  echo "Waiting for replica set to be primary..."
  sleep 1
done

echo "Creating admin user..."
mongosh --host localhost --eval "db.getSiblingDB('admin').createUser({ user: 'root', pwd: 'minijuniando', roles: [{ role: 'root', db: 'admin' }] })"

echo "MongoDB initialization complete."

