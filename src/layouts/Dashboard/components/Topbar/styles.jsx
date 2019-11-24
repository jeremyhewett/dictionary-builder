export default theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    marginLeft: '-4px'
  },
  rightSpacer: {
    marginLeft: 'auto'
  },
  rightButton: {
    marginLeft: theme.spacing(1)
  },
  editButtonActive: {
    'background-color': 'rgba(0, 0, 0, 0.2)',
    '&:hover': {
      'background-color': 'rgba(0, 0, 0, 0.3)'
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 500,
    height: '32px',
    width: '32px'
  },
});
