export default theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  buttonGroup: {
    width: '100%'
  },
  letter: {
    height: '40px',
    'min-width': 'calc((100% + 25px) / 26)'
  }
});
