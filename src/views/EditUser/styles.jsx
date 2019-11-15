export default theme => ({
  root: {
    padding: theme.spacing(4)
  },
  progressWrapper: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    display: 'inline-block',
    paddingRight: '10px'
  },
  subtitle: {
    display: 'inline-block',
    fontWeight: 400,
    color: theme.palette.text.secondary
  },
  field: {
    margin: theme.spacing(3)
  },
  checkboxField: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing(3)
  },
  portletFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  row: {
    marginTop: theme.spacing(1)
  },
});
