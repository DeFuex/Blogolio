module.exports = (props) => {
  const body = props && props.body ? props.body : '';
  const template = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Blogolio - A simple Blog page build with React" />
      <title>Blogolio - A simple Blog page build with React</title>
      <!-- stylesheets -->
      <link rel="stylesheet" href="/src/css/blogolio.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/src/css/bootstrap-social.css" />
      <link href="/src/fonts/fontawesome-webfont.woff2" />
      <link href="/src/fonts/fontawesome-webfont.woff" />
      <link href="/src/fonts/fontawesome-webfont.eot" />
      <link href="/src/fonts/fontawesome-webfont.svg" />
      <link rel="stylesheet" href="/src/css/font-awesome.css" />
      <!-- favicon.ico -->
      <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' >
      <!-- Google Roboto Fonts for text -->
      <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    </head>
    <body>
      <div id="root">
        ${body}
      </div>
      <!-- Latest compiled and minified JavaScript -->
      <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      <script src="/static/blogolio.js"></script>
    </body>
  </html>`;
  return template.trim();
};
