export default theme => ({
  root: {
    margin: '10px'
  },
  title: {
    display: 'inline-block',
    paddingRight: '10px'
  },
  spellingVariants: {
    display: 'inline-block',
    fontStyle: 'italic'
  },
  container: {
    padding: '10px'
  },
  section: {
    'margin-bottom': '10px',
    padding: theme.spacing(3)
  },
  inlineViewer: {
    display: 'inline-block',
    '& .ql-tooltip.ql-hidden': {
      display: 'none'
    },
    '& .ql-editor': {
      padding: 0,
      overflowY: 'initial'
    },
    '& .ql-container': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },
  order: {
    fontWeight: 'bold'
  },
  partOfSpeech: {
    fontStyle: 'italic'
  },
  definition: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  canadianismType: {
    fontStyle: 'italic'
  },
  citations: {
    marginTop: '10px',
    padding: '20px',
    backgroundColor: theme.palette.background.darker
  },
  citation: {
    marginBottom: '5px'
  },
  citationYear: {
    fontWeight: 'bold'
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  }
});
