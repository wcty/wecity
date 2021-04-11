import { createMuiTheme } from '@material-ui/core/styles'
import { grey, amber} from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: grey[600],
      dark: grey[800],
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    // accent: {
    //   ...amber,
    // },
  },
  components:{
    MuiAppBar: {
      styleOverrides:{
        root:{
          height: 100
        }
      }
    },
  }
})
