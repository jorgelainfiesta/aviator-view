"""Streamers of data"""
# wow, so descriptive

import time
from models import Flight

class GenericStreamer:
    """To stream data from a specific url every specified time"""
    
    def __init__(self, url, interval):
        self.url = url
        self.interval = interval
        self.playing = False
        
    def start(self):
        self.playing = True
        while self.playing:
            # somehow retrieve an object with information from url
            dum_lat = 211500
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