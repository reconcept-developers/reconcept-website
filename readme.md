# Reconcept site

This site was built using Hugo. It's a static site generator that's easy to use.

## Installing Hugo

https://gohugo.io/getting-started/installing/

## Installing dependencies

`npm i`

## Livereload server

`hugo server`

## Content management

The website's content is managed in /content. A new static page at `/page` either by creating a `page.html` or `page/index.html`. When creating a directory that has it's own index page and subpages, the page should be named `_index.html`, otherwise it will create a 'list' type page instead of a real page.

## Layout and styling

Layout and styling are taken care of in a 'theme' that can be found in `/themes/reconcept`.

## Deploying site

To deploy the site, push all changes to master and run:

`./publish.sh`

The site will be deployed as a static site on github. It will also trigger an invalidation in CloudFront, so you will need a personal AWS API key with the proper permissions to do this.