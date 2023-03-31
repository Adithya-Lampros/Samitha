import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "DataDao Information",
  },
  {
    label: "Votting Settings",
  },
  {
    label: "Token Configuration",
  },
  {
    label: "Review Information",
  },
];

export default function StepsForm({
  activeStep,
  handleNext,
  handleBack,
  handleReset,
}) {
  // const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                // Last step
                index === 2 ? <Typography variant="caption"></Typography> : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {/* <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
