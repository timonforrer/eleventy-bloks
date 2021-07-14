module.exports = function(dateInput, transformTo) {

  // these options will be displayed in the error logs, if no option is specified
  let options = ['html-iso'];

  // get date object from filter input
  let date = new Date(dateInput);

  switch (transformTo){
    case 'html-iso':
      // returns date in format YYYY-MM-DD
      return date.toISOString().substring(0, 10);
      break;
    default:
      // throw error if no output style is specified
      console.error(`
        please specify, how you want your date to be transformed. Possible options are:
        ${options.map(option => option)}
      `);
  }
}
