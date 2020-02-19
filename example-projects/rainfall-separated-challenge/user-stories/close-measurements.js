function closeMeasurementsHandler() {
  debugger;

  // update state
  measurements.closed = true;

  // update UI
  const measurementsButton = document.getElementById('measurement-button');
  measurementsButton.removeEventListener('click', addMeasurementHandler);
  measurementsButton.value = 'measurements are closed';

  // log action
  log.push({
    userStory: 'close measurements',
    measurements: JSON.parse(JSON.stringify(measurements))
  })

}
document.getElementById('close-button')
  .addEventListener('click', closeMeasurementsHandler);

