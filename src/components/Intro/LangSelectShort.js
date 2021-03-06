import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core'
import * as Atoms from 'global/Atoms'
import { useRecoilState } from 'recoil'
import { useI18n } from 'global/Hooks'

const useForceUpdate = () => useState()[1];

export default ({toggleDrawer, ...props})=>{
    const i18n = useI18n()
    const [lang, setLang] = useRecoilState(Atoms.lang);
    const forceUpdate = useForceUpdate();
    const changeLanguage = (event) => {
      setLang(event.target.value);
      forceUpdate()
      if(toggleDrawer) toggleDrawer(false)
      console.log(i18n('learnReact'))
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