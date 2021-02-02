import React from 'react'
import {SvgIcon} from '@material-ui/core'


// extends SvgIcon, just adds some styling
export  function CustomSvgIcon(props:any) {
    return (
        <SvgIcon style={{margin : '0 8px'}}>
            {props.children}
        </SvgIcon>
       
    )
}
