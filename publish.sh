#!/bin/sh
rm -r ../dev/www/*
cp -r www/* ../dev/www
cd ../dev
git add .
git commit -m "Pubblicazione automatica"
git push
