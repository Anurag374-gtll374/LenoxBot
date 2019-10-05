var router = require('express').Router();
const islenoxboton = require('../middleware/islenoxboton');
const languages = require('../middleware/languages');

router.get('/', (req, res) => {
  console.log('Called /error route');
  const check = [];
  if (req.user) {
    for (let i = 0; i < req.user.guilds.length; i += 1) {
      // eslint-disable-next-line no-bitwise
      if (((req.user.guilds[i].permissions) & 8) === 8) {
        check.push(req.user.guilds[i]);
      }
    }
  }
  console.log('Called /error route2');

  let fix = false;
  let howtofix = '';

  if (req.query.message === "Cannot read property 'prefix' of null") {
    fix = true;
    howtofix = 'Write a textmessage in a textchannel on your discord server';
  }
  if (req.query.message === "Cannot read property 'dashboardpermissionroles' of null") {
    fix = true;
    howtofix = 'Write a textmessage in a textchannel on your discord server';
  }
  console.log('Called /error route3');

  const islenoxbot = islenoxboton(req);
  const lang = require(`../languages/website_${req.getLocale()}`);

  console.log('Called /error route4');
  res.status(404);
  return res.render('error', {
    lang,
    languages: languages(req),
    user: req.user,
    guilds: check,
    islenoxbot,
    statuscode: req.query.statuscode,
    message: req.query.message,
    fix,
    howtofix
  });
});

module.exports = router;
