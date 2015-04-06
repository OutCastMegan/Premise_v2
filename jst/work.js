var Work;

Work = {
  mapToken: false,
  i: function() {
    var map;
    if (!Loader.mobile) {
      map = L.mapbox.map('map', 'joeraii.l6ao27k2', {
        accessToken: mapboxToken,
        zoomControl: false
      });
      return map.scrollWheelZoom.disable();
    }
  }
};
