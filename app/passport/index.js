const passport = require('passport')

const { models } = require('../../db/models')
const { login_local_strategy, access_token_strategy, refresh_token_strategy } = require('../../auth/strategies')//(models.user)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});


passport.use('user-local-login', login_local_strategy(models.user))
passport.use('access-token-auth', access_token_strategy(models.user))
passport.use('refresh-token-auth', refresh_token_strategy(models.user))

module.exports = passport