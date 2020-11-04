#!/bin/sh

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo "Uploading site"
rsync -avzr -e "ssh -p 2509" --progress public/ reconcept@185.27.174.207:/www/reconcept-home/