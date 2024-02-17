#!/bin/sh

echo "A rinha vai começar!"
cd src
npm run migrations &
sleep 5
npm run dev