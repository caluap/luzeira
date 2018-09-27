# Luzeira’s visual identity

This project consists of a script to generate the different versions of a dynamic logotype we developed for Luzeira, Mariana Campo’s company that does astrological readings.

These *versions* of the logotype are based on the positions for each day of each of the first five planets in the solar system (Mercury, Venus, Mars, Jupiter and Saturn), and also the Sun and Moon, with the so-called astrological aspects being highlighted whenever they occur. These come in four types: conjunction, when two planets share the same angle; square, when the angle is 90° (1/4 of the arc); trine, when the angle is 120° (1/3 of the arc); and opposition, when the angle is 180° (1/2 the arc).

We used data (the *ephemerides*) from 1900 to 2100 obtained from findyourfate.com. The JSON files used aren't included, but the Python scripts to obtain them are (as Jupyter Notebook files) are. Watch out for a missing data point for Uranus in 2071!

The code here is free to use and adapt, but Luzeira’s logo is not.

The live generator is hosted @ http://luzeira.caluapataca.com/.