import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'


const steps = ["Placed" , "Order Confirmed" ,"Shipped" , "Out for Delivery" , "Delivered" ]
const OrderTracker = ({activeStep}) => {
  return (
    <Box className='w-full'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label)=>(
                <Step>
                    <StepLabel sx={{fontSize: "44px"}}>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
      
    </Box>
  )
}

export default OrderTracker
