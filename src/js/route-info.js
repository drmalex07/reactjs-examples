
const routes = new Map([
  ['/', {
    name: 'home', title: 'Home',
  }],
  ['/dashboard', {
    name: 'dashboard', title: 'Dashboard'
  }],
  ['/greet', {
    name: 'greeter', title: 'Greeter',
  }],
  ['/settings', {
    name: 'settings', title: 'Settings'
  }]
]);

module.exports = routes;
