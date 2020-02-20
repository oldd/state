function openMeasurementsHandler() {
  debugger;

  // update state
  measurements.closed = false;

  // update UI
  const measurementsButton = document.getElementById('measurement-button');
  measurementsButton.addEventListener('click', addMeasurementHandler);
  measurementsButton.value = 'add measurement';

  const closeButton = document.getElementById('close-button');
  closeButton.innerHTML = 'close measurements';
  closeButton.removeEventListener('click', openMeasurementsHandler);
  closeButton.addEventListener('click', closeMeasurementsHandler);

  // log action
  log.push({
    userStory: 'open measurements',
    measurements: JSON.parse(JSON.stringify(measurements))
  })

}

