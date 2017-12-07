export default function setInterceptors(bot, dashbot) {
  const { client: { accessToken, axios, version } } = bot.connector;

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const { config } = response;
    if (/graph\.facebook\.com.*\/me\/messages/.test(config.url)) {
      const { recipient: { id }, message: { text } } = JSON.parse(config.data);
      const requestData = {
        url: `https://graph.facebook.com/v${version}/me/messages`,
        qs: { access_token: accessToken },
        method: 'POST',
        json: {
          recipient: { id },
          message: {
            text,
          },
        },
      };

      dashbot.logOutgoing(requestData, response.body);
    }
    return response;
  });
}
