// const Vue = require('vue');
const server = require('express')();
// import { createApp } from './app'; ----- this is effectively accomplished by our bundle

// this will look different in Deno, using its own file-system methods.

// May not need this file structure anymore
// const template = require('fs').readFileSync('./index.template.html', 'utf-8');

// unsure if these two are relevent in our Deno app
// vue-server-renderer is potentially incompatible with Deno, pending on /basic.js

// May not need this file structure anymore
// const renderer = require('vue-server-renderer').createRenderer({
//   template,
// });

//context object will be avavilable to server through the bundling process and doesn't need to be defined here anymore

// const context = {
//   title: 'vue ssr',
//   metas: `
//         <meta name="keyword" content="vue,ssr">
//         <meta name="description" content="vue srr demo">
//     `,
// };

server.get('*', (req, res) => {
  const context = { url: req.url };

  createApp(context).then((app) => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found');
        } else {
          res.status(500).end('Internal Server Error');
        }
      } else {
        res.end(html);
      }
    });
  });
});

server.listen(8080);

//"getting started" in vue ssr guide --> createApp above comes from the bundling process and is imported to our server that way

// server.get('*', (req, res) => {
//   const app = new Vue({
//     data: {
//       url: req.url,
//     },
//     template: `<div>The visited URL is: {{ url }}</div>`,
//   });

//   renderer.renderToString(app, context, (err, html) => {
//     console.log(html);
//     if (err) {
//       res.status(500).end('Internal Server Error');
//       return;
//     }
//     res.end(html);
//   });
// });

// server.js

// using webpack for hot hot hot reloading lol
// webpack turns bundling into json which is read and served via vue-server-renderer
// with createBundleRenderer method

/*const { createBundleRenderer } = require('vue-server-renderer');
                        
/* When renderToString is called on a bundle renderer, it will automatically execute the
function exported by the bundle to create an app instance (passing context as the argument) , 
and then render it. */

// const renderer = createBundleRenderer(serverBundle, {
//   runInNewContext: false, // recommended
//   template, // (optional) page template
//   clientManifest, // (optional) client build manifest
// });
// server.get('*', (req, res) => {
//   const context = { url: req.url };

// const context = { url: req.url };
// // No need to pass an app here because it is auto-created by
// // executing the bundle. Now our server is decoupled from our Vue app!
// renderer.renderToString(context, (err, html) => {
//   // handle error...
//   res.end(html);
// });
