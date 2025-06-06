import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have this utility for classnames
import { CheckCircle, Circle, Loader2, Truck } from 'lucide-react'; // Example icons

interface Step {
  id: string;
  name: string;
  icon?: React.ElementType;
}

interface OrderStatusStepperProps {
  steps: Step[];
  currentStepId: string;
  completedStepIcon?: React.ElementType;
  currentStepIcon?: React.ElementType;
  futureStepIcon?: React.ElementType;
}

const defaultSteps: Step[] = [
    { id: 'confirmed', name: 'Order Confirmed', icon: CheckCircle },
    { id: 'preparing', name: 'Preparing Food', icon: Loader2 },
    { id: 'delivery', name: 'Out for Delivery', icon: Truck },
    { id: 'delivered', name: 'Delivered', icon: CheckCircle },
];

const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({
  steps = defaultSteps,
  currentStepId,
  completedStepIcon: CompletedIcon = CheckCircle,
  currentStepIcon: CurrentIcon = Loader2,
  futureStepIcon: FutureIcon = Circle,
}) => {
  console.log("Rendering OrderStatusStepper, current step:", currentStepId);
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <div className="flex items-center w-full px-4 py-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const Icon = isCompleted ? CompletedIcon : (isCurrent ? CurrentIcon : (step.icon || FutureIcon));

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  isCompleted ? "bg-green-500 border-green-500 text-white" : "",
                  isCurrent ? "bg-blue-500 border-blue-500 text-white animate-pulse" : "",
                  !isCompleted && !isCurrent ? "border-gray-300 text-gray-400" : ""
                )}
              >
                <Icon className={cn("w-4 h-4", isCurrent && step.id === 'preparing' ? "animate-spin" : "")} />
              </div>
              <p className={cn(
                "mt-1 text-xs text-center w-20 truncate",
                isCurrent ? "font-semibold text-blue-600" : "text-muted-foreground"
              )}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5",
                isCompleted || isCurrent ? "bg-blue-500" : "bg-gray-300"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default OrderStatusStepper;