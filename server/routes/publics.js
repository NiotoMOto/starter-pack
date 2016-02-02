'use strict';

const koa = require('koa');
const route = require('koa-route');
var User = require('mongoose').model('User');
var passport = require('koa-passport')
const main = koa();


main.use(route.get('/login', function *() {
  this.body = yield this.render('Login', {
    props: {
      cheers: 'Coloquons',
    },
    title: 'Login'
  });
}));

main.use(route.get('/logout', function *() {
  this.logout();
  this.redirect('/');
}));



main.use(route.post('/login', function*(next) {
    var ctx = this
    yield passport.authenticate('local', function*(err, user, info) {
      if (err) throw err
      if (user === false) {
        ctx.status = 401
        ctx.redirect('/login');
      } else {
        yield ctx.login(user)
        ctx.redirect('/');
      }
    }).call(this, next)
}));

module.exports = main;
