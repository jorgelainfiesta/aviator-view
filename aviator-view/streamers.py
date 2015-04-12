"""Streamers of data"""
# wow, so descriptive

import time, urllib, json
from  pymongo import MongoClient
from models import Flight

class GenericStreamer:
  """To stream data from a specific url every specified time""" 
  def __init__(self):
    self.url = ""
    self.interval = 5
    self.playing = False
    #Load from DB
    client = MongoClient()
    db = client.aviator
    self.flights = db.flights.find({"ac_id":"HAL348"})
    self.flighti = 0

  def stop(self):
    self.playing = False

        
def get_sky_front_color(time, sunrise, sunset):
  daylight = sunset - sunrise
  time = time - sunrise
  pct = time / daylight
  color = (0, 0, 0)
  if time < sunrise or time > sunset:
      color = (1, 1, 16)
  elif pct < 1 or pct > 99:
      color = (26, 26, 24)
  elif pct < 2 or pct > 98:
      color = (33, 36, 107)
  elif pct < 3 or pct > 97:
      color = (86, 34, 179)
  elif pct < 4 or pct > 96:
      color = (162, 16, 211)
  elif pct < 5 or pct > 95:
      color = (235, 71, 202)
  elif pct < 6 or pct > 94:
      color = (255, 124, 18)
  elif pct < 7 or pct > 93:
      color = (255, 218, 80)
  elif pct < 8 or pct > 92:
      color = (255, 255, 177)
  elif pct < 9 or pct > 91:
      color = (255, 255, 227)
  elif pct < 10 or pct > 90:
      color = (255, 255, 243)
  else:
      color = (255, 255, 255)
  return color

def get_sky_back_color(time, sunrise, sunset):
  daylight = sunset - sunrise
  time = time - sunrise
  pct = time / daylight
  color = (0, 0, 0)
  if time < sunrise or time > sunset:
      color = (0, 0, 0)
  elif pct < 1 or pct > 99:
      color = (0, 15, 22)
  elif pct < 2 or pct > 98:
      color = (2, 36, 52)
  elif pct < 3 or pct > 97:
      color = (1, 54, 85)
  elif pct < 4 or pct > 96:
      color = (0, 93, 144)
  elif pct < 5 or pct > 95:
      color = (0, 109, 166)
  else:
      color = (0, 150, 187)
  return color
        
class MeteorologicalData:
  """A class for getting meteorological data from a location"""

  apikey = '330a488a07f48645f013d5e8342919b2'
  url = 'http://api.openweathermap.org/data/2.5/weather?lat={lat!s}&lon={lon!s}&APPID={apikey!s}'

  def get_data(self, latitude, longitude):
    url = MeteorologicalData.url.format(lat=latitude, lon=longitude, apikey=MeteorologicalData.apikey)
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    clouds = data.get('clouds')
    wind = data.get('wind')
    main = data.get('main')
    rain = data.get('rain')
    sys = data.get('sys')
    meteoro = {}
    meteoro['clouds'] = clouds.get('all') if clouds else None
    meteoro['wind_speed'] = wind.get('speed') if wind else None
    meteoro['wind_direction'] = wind.get('dir') if wind else None
    meteoro['humidity'] = main.get('humidity') if main else None
    meteoro['temp'] = main.get('temp') if main else None
    meteoro['rain'] = rain.get('3h') if rain else None
    meteoro['sky_front_color'] = get_sky_front_color(data.get('dt'), sys.get('sunrise'), sys.get('sunset')) if sys else None
    meteoro['sky_back_color'] = get_sky_back_color(data.get('dt'), sys.get('sunrise'), sys.get('sunset')) if sys else None
    meteoro['lat'] = latitude
    meteoro['long'] = longitude
    return meteoro        
        
        
        
        
md = MeteorologicalData()

import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import datetime
        
class DummyFlightStreamer(tornado.websocket.WebSocketHandler):
  """A dummy class to simulate the flight tracking stream"""
    
  def action(self):
    #Get current flight
    obj = self.flights[self.flighti]
    self.flighti += 1
    #Load data from raw object 
    flight = Flight()
    flight.aircraft_id = obj['ac_id']
    flight.aircraft_type = obj['ac_type']
    flight.latitude = str(obj['lat'])[:-4] + '.' + str(obj['lat'])[-4:]
    flight.longitude = str(obj['long'])[:-4] + '.' + str(obj['long'])[-4:]
    flight.speed = obj['speed']
    flight.altitud = obj['altitude']
    flight.heading = obj['heading']
    flight.center = obj['center']
    flight.sector = obj['sector']
    #Write in websocket
    self.write_message(md.get_data(flight.latitude, flight.longitude))

  def open(self):
    print('user is connected.\n')
    self.write_message("Connected!")
    #Load from DB
    client = MongoClient()
    db = client.aviator
    self.flights = db.flights.find({"ac_id":"HAL348"})
    self.flighti = 0
    #Run loop
    tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=5), self.action)

  def on_message(self, message):
    print('received message: %s\n' % message)

  def on_close(self):
    print('connection closed\n')
    
  def check_origin(self, origin):
    return True

application = tornado.web.Application([(r'/ws', DummyFlightStreamer)])

if __name__ == "__main__":
#  application = Application()
  http_server = tornado.httpserver.HTTPServer(application)
  http_server.listen(9999)
  tornado.ioloop.IOLoop.instance().start()
