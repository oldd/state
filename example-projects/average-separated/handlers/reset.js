function resetMeasurementsHandler() {
  debugger;

  // update state
  measurements.validMeasurements = [];
  measurements.invalidMeasurements = [];
  measurements.average = 0;
  measurements.closed = false;

  // update UI
  document.getElementById('current-average').innerHTML = measurements.average;
  document.getElementById('input-form').measurement.value = '';

  const measurementsButton = document.getElementById('measurement-button');
  measurementsButton.addEventListener('click', addMeasurementHandler);
  measurementsButton.value = 'add measurement';

  // log action
  log.push({
    userStory: 'reset measurements',
    measurements: JSON.parse(JSON.stringify(measurements))
  })

}

