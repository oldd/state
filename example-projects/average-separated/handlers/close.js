function closeMeasurementsHandler() {
  debugger;

  // update state
  measurements.closed = true;

  // update UI
  const measurementsButton = document.getElementById('measurement-button');
  measurementsButton.removeEventListener('click', addMeasurementHandler);
  measurementsButton.value = 'measurements are closed';

  const closeButton = document.getElementById('close-button');
  closeButton.innerHTML = 'open measurements';
  closeButton.removeEventListener('click', closeMeasurementsHandler);
  closeButton.addEventListener('click', openMeasurementsHandler);

  // log action
  log.push({
    userStory: 'close measurements',
    measurements: JSON.parse(JSON.stringify(measurements))
  })

}

