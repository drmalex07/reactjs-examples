# reactjs-examples

Examples with ReactJS Ui framework

## Build

Install SASS globally to be used as CSS compiler:

    sudo gem install sass

Install Grunt locally (and use a symlink for convenience):

    npm install grunt-cli grunt
    ./grunt

Install all project dependencies:

    npm install

Build, copy to target folder (by default is `public/www`), and watch for changes:

    grunt build deploy watch

## Serve the example application

Start express server:

    npm start
