window.onload = function () {
  // render initial state
  document.getElementById('current-average').innerHTML = measurements.average;

  // log initial state
  log.push({
    initialMeasurements: JSON.parse(JSON.stringify(measurements))
  });
}
