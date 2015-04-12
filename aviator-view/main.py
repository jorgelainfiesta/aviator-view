from streamers import DummyFlightStreamer, MeteorologicalData

#stream = DummyFlightStreamer(5)
#stream.start()

md = MeteorologicalData()
print(md.get_data(21.3000, 158.4700))

