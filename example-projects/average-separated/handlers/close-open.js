function closeOpenHandler() {
  debugger;

  // update state
  measurements.closed = !measurements.closed;

  // update UI based on state
  const measurementsButton = document.getElementById('measurement-button');
  const closeButton = document.getElementById('close-open-button');
  if (measurements.closed) {
    measurementsButton.value = 'measurements are closed';
    measurementsButton.removeEventListener('click', addMeasurementHandler);
    closeButton.innerHTML = 'open measurements';
  } else {
    measurementsButton.value = 'add measurement';
    measurementsButton.addEventListener('click', addMeasurementHandler);
    closeButton.innerHTML = 'close measurements';
  }

  // log action
  log.push({
    handler: 'close/open measurements',
    measurements: JSON.parse(JSON.stringify(measurements))
  })

}

