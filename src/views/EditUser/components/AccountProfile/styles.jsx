export default theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  info: {},
  subtitle: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  subtitle2: {
    color: theme.palette.text.secondary
  },
  avatar: {
    marginLeft: 'auto',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0,
    //backgroundColor: theme.palette.primary.main,
    fontSize: '31px',
  },
  progressWrapper: {
    marginTop: theme.spacing(2)
  }
});
