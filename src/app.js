import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

// export a factiory function for creating fresh app, router and store instances
// the root instance simply renders the App component.

export function createApp() {
  const router = createRouter();

  const app = new Vue({
    router,
    render: (h) => h(App),
  });
  return { app, router };
}

// this is kind of like this:
// ReactDOM.render(<App /> document.getElementById('#root'));
