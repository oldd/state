function addMeasurementHandler(event) {
  debugger;

  // read user input
  const newMeasurementStr = event.target.form.measurement.value;
  const newMeasurement = Number(newMeasurementStr);

  // read from state
  const validMeasurements = measurements.validMeasurements;
  const invalidMeasurements = measurements.invalidMeasurements;
  const currentAverage = measurements.average;

  // perform core logic
  let newAverage;
  if (Number.isNaN(newMeasurement)) {
    invalidMeasurements.push(newMeasurementStr);
    newAverage = currentAverage;
  } else {
    validMeasurements.push(newMeasurement);
    newAverage = average(validMeasurements);
  }

  // update state
  measurements.validMeasurements = validMeasurements;
  measurements.invalidMeasurements = invalidMeasurements;
  measurements.average = newAverage;

  // re-render UI from state
  document.getElementById('current-average').innerHTML = measurements.average;

  // log action
  log.push({
    userStory: 'add measurement',
    newMeasurementStr,
    newMeasurement,
    measurements: JSON.parse(JSON.stringify(measurements))
  })

}
document.getElementById('measurement-button')
  .addEventListener('click', addMeasurementHandler);

