import phpServer from 'php-server';

  const server = await phpServer({
    open: false,
    router: '_dev-server-router.php',
    port: 8899,
  });
  console.log(`PHP server running at ${server.url}`);
