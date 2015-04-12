# Meteorological data

This document describes the mapping between the meteorological data consulted from the API provider, and the variables calculated for the rendering of the sky.

## Clouds

To display the amount of clouds in the aviator view, the following variables are provided:

- Cloudiness percentage (float 0 to 1)
- Wind speed (mps)
- Wind direction (deg)
- Humidity percentage (float 0 to 1)

## Sky

- Temperature (kelvin)
- Color (hex)

## Rain

- Rain precipitation for last 3 hours (mm)
- Snow for last 3 hours (mm)

## Sun

- Sun x position in relation to plane (deg)
- Sun y position in relation to plane (deg)