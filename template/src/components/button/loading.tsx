import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
 
const LoadingButtonView = ({ onClick, loading, children, disabled }: any) => (
 <Button variant="contained" onClick={onClick} disabled={loading || disabled}>
   {loading ? <CircularProgress size={14} /> : <>{children}</>}
 </Button>
)
 
export default LoadingButtonView
 

