#!/bin/sh

# set error so that script will stop on error
set -e

# if [ "`git status -s`" ]
# then
#     echo "The working directory is dirty. Please commit any pending changes."
#     exit 1;
# fi
CONFIG=$1

CONFIG_FILENAME="config.toml"

BUCKET="reconcept.nl"
DISTRIBUTIONID="EZBWG58HOG40X"

if [ "$CONFIG" = "dev" ]; then
  CONFIG_FILENAME="config-dev.toml"
fi

echo $CONFIG
echo $CONFIG_FILENAME

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo --config $CONFIG_FILENAME

echo "$BUCKET ---[Copying package to server]---"
aws s3 sync ./public s3://$BUCKET

echo "---[Creating invalidation]---"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTIONID --paths "/*"

printf "\n\n!!! DONE DEPLOYING !!!\n\n"
