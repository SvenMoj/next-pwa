const webPush = require('web-push')

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

const sendNotification = async (subscription) => {
  webPush
    .sendNotification(
      subscription,
      JSON.stringify({ title: 'Hello Web Cron', message: 'Hopefully sending a message every 5 seconds' })
    )
    .then(response => {
      res.writeHead(response.statusCode, response.headers).end(response.body)
    })
    .catch(err => {
      if ('statusCode' in err) {
        res.writeHead(err.statusCode, err.headers).end(err.body)
      } else {
        console.error(err)
        res.statusCode = 500
        res.end()
      }
    })
}

const Notification = (req, res) => {
  if (req.method == 'POST') {
    const { subscription } = req.body
    sendNotification(subscription)
  }
  else {
    res.statusCode = 405
    res.end()
  }
}

export default Notification
