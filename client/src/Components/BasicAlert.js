import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function BasicAlert(props) {
  return (
    <>
    {props.alert && <Alert sx={{position:'sticky',top:"100px", marginBottom:'0px', width:'100%'}} severity={props.alert.type}>{props.alert.msg}</Alert>}
        
    </>
  )
}

export default BasicAlert