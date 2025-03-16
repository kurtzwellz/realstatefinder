import { useMemo } from 'react';

/**
 * Custom hook to calculate form progression
 * 
 * @param totalSteps Total number of steps in the form
 * @param currentStep Current step user is on
 * @returns Object with progress percentage
 */
export function useFormProgress(totalSteps: number, currentStep: number) {
  const progress = useMemo(() => {
    // Calculate progress percentage (0-100)
    // Ensure progress is at least 5% at first step for visual feedback
    // and 100% for the final step
    if (currentStep >= totalSteps) {
      return 100;
    }
    
    if (currentStep <= 1) {
      return 5;
    }
    
    // Calculate progress with a bit of buffer at the start and end
    // This ensures that the first step shows some progress and the last step 
    // doesn't quite reach 100% until form is submitted
    return Math.round(((currentStep - 1) / (totalSteps - 1)) * 95) + 5;
  }, [currentStep, totalSteps]);

  return { progress };
}
