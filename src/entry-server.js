import { createApp } from './app';

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      resolve(app);
    }, reject);
  });
};

/*
export default async (context) => {
try {
  const { app, router } = await createApp();
  router.push(context.url);
  router.onReady( async () => {
      const matchedComponents = await router.getMatchedComponents();
      if (!matchedComponents.length) {
        return console.error({ code: 404 })
      }
      return app;
  } catch (error) {

  };
}
};
*/
