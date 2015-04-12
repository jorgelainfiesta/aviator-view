from streamers import DummyFlightStreamer
import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

#stream = DummyFlightStreamer(5)
#stream.start()

#application = tornado.web.Application([(r'/ws', DummyFlightStreamer),])

#application = tornado.web.Application(((r'/ws', DummyFlightStreamer),))

application = tornado.web.Application([(r'/ws', DummyFlightStreamer)])

if __name__ == "__main__":
#  application = Application()
  http_server = tornado.httpserver.HTTPServer(application)
  http_server.listen(9999)
  tornado.ioloop.IOLoop.instance().start()