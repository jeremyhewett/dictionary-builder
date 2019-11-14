export default theme => ({
  root: {
    padding: theme.spacing(4)
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
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing(3),
    '& .MuiAutocomplete-inputRoot.MuiInputBase-marginDense': {
      padding: 0,
      '& .MuiAutocomplete-input': {
        padding: '10.5px 14px'
      }
    }
  },
  editor: {
    '& .ql-toolbar': {
      borderRadius: '4px 4px 0 0'
    },
    '& .ql-container': {
      borderRadius: '0 0 4px 4px'
    }
  },
  sourceTab: {
    minWidth: '120px'
  },
  portletFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  saveButton: {

  },
  row: {
    marginTop: theme.spacing(1)
  },
});
