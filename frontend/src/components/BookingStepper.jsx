import { Stepper, Step, StepLabel, Paper } from "@mui/material";

const steps = ["Select Room", "Guest Details", "Payment", "Confirmation"];

function BookingStepper({ activeStep }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}

export default BookingStepper;
