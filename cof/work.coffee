
Work =

  mapToken: false

  i: ->

    if !Loader.mobile
      map = L.mapbox.map 'map', 'joeraii.l6ao27k2',
        accessToken: mapboxToken
        zoomControl: false
      map.scrollWheelZoom.disable()

      #map.dragging.disable()
      #map.touchZoom.disable()
      #map.doubleClickZoom.disable()
         
