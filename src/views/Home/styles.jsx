export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    //marginTop: theme.spacing(2)
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'background': '#a8d1ff',
    opacity: 0,
    transition: 'opacity .5s',
    '&:hover': {
      opacity: 0.3
    }
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  pagination: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
