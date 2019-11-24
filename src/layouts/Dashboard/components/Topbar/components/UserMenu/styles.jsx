export default theme => ({
  root: {
    width: '350px',
    maxWidth: '100%'
  },
  content: {},
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  listItemIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: '10px',
    borderRadius: '50%',
    marginRight: theme.spacing(2)
  },
  listItemTextSecondary: {
    marignTop: '4px',
    color: theme.palette.text.secondary
  }
});
