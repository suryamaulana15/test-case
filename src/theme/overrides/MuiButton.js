import palette from '../palette';

export default {
  contained: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    backgroundColor: '#FFFFFF',
    textTransform: "none",
    fontWeight: "bold"
  },
  containedPrimary: {
    backgroundColor: '#1C81F7',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#0277BD'
    },
    marginBottom: 5,
  },
  containedSecondary: {
    backgroundColor: palette.warning.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: palette.warning.dark
    },
    marginBottom: 5
  }
}
