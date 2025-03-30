#!/bin/bash

git checkout release
git merge develop

if [ $1 == "major" ]
then
  npm version major
elif [ $1 == "minor" ]
then
  npm version minor
elif [ $1 == "patch" ]
then
  npm version patch
fi

git add .
git commit -m "bump $1 version"
git push

git checkout develop
git merge release
git push

git checkout master
git merge develop
git push

git checkout develop