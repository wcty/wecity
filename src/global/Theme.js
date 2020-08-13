import { createMuiTheme } from '@material-ui/core/styles'
import { grey, amber} from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[0],
      main: grey[100],
      dark: grey[200],
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    accent: {
      ...amber,
    },
  },
  overrides: {
    MuiAppBar: {
      height: 100,
    },
  },
})
