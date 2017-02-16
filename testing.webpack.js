var context = require.context('./test/test.js', true, /test\.js$/);
context.keys().forEach(context);
