window.onload = function () {
  debugger;
  // render UI from initial state
  document.getElementById('current-average').innerHTML = measurements.average;
  document.getElementById('close-open-button').innerHTML = measurements.closed
    ? 'open measurements'
    : 'close measurements';
  document.getElementById('measurement-button').value = measurements.closed
    ? 'measurements are closed'
    : 'add measurement';

  // log initial state
  log.push({
    initialMeasurements: JSON.parse(JSON.stringify(measurements))
  });
}
