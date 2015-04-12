"""Streamers of data"""
# wow, so descriptive

import time
from models import Flight
import urllib, json

class GenericStreamer:
    """To stream data from a specific url every specified time"""
    
    def __init__(self, interval):
        self.interval = interval
        self.playing = False
        
    def start(self):
        self.playing = True
        dum_lat = 211500
        while self.playing:
            # somehow retrieve an object with information from url
            obj = {
                'ac_id': 'HAL348',
                'ac_type': 'B712',
                'lat': dum_lat,
                'long': 1584700,
                'speed': 260,
                'altitude': 14,
                'heading': 117,
                'center': 'OAO',
                'sector': 'ZHNHN'
            }
            dum_lat += 100
            self.action(obj)
            time.sleep(self.interval)
            
    def stop(self):
        self.playing = False
        
class DummyFlightStreamer(GenericStreamer):
    """A dummy class to simulate the flight tracking stream"""
    
    def action(self, obj):
        flight = Flight()
        flight.aircraft_id = obj['ac_id']
        flight.aircraft_type = obj['ac_type']
        flight.latitude = obj['lat']
        flight.longitude = obj['long']
        flight.speed = obj['speed']
        flight.altitud = obj['altitude']
        flight.heading = obj['heading']
        flight.center = obj['center']
        flight.sector = obj['sector']
        print(flight.latitude)
        

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