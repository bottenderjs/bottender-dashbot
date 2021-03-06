import _dashbot from 'dashbot';

import setInterceptors from './setInterceptors';

export default function dashbotMiddleware(bot, { apiKey, platform }) {
  const dashbot = _dashbot(apiKey)[platform];

  setInterceptors(bot, dashbot);

  return (req, res, next) => {
    dashbot.logIncoming(req.body);

    next();
  };
}
