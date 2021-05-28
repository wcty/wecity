import { useState } from 'react'
import { FormControl, Select, MenuItem, Box } from '@material-ui/core'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { useI18n, atoms } from 'misc'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const useForceUpdate = () => useState()[1];

export default ({toggleDrawer=undefined, ...props}:{toggleDrawer?: SetterOrUpdater<boolean>|undefined})=>{
    const i18n = useI18n()
    const [lang, setLang] = useRecoilState(atoms.lang);
    const forceUpdate = useForceUpdate();
    const changeLanguage = (event:any) => {
      setLang(event.target.value);
      cookies.set('lang', event.target.value, { path: '/' }); //add selected language in the cookies
      forceUpdate(undefined)
      if(toggleDrawer) toggleDrawer(false)
    }
  
    return <Box {...props}><FormControl style={{width:"100%"}}>
        <Select
          labelId="label-langSelect"
          id="langSelect"
          value={lang}
          onChange={changeLanguage}
          label="lang"
        >
            <MenuItem value={'en'}><span role="img" aria-label="english">EN</span></MenuItem>
            <MenuItem value={'uk'}><span role="img" aria-label="ukrainian">UA</span></MenuItem>
            {/* <MenuItem value={'ka'}>ka</MenuItem> */}
            {/* <MenuItem value={'fi'}>fi</MenuItem> */}
        </Select>
    </FormControl></Box>
}