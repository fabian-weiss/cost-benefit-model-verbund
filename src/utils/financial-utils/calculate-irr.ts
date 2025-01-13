export function calculateIRR(
  cashFlows: number[],
  guess: number = 0.1
): number | undefined {
  const maxIterations = 20;
  const precision = 1e-7;

  console.log(`cashFlows: ${cashFlows}, guess: ${guess}`);

  let rate = guess;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let npv = 0;
    let npvDerivative = 0;

    // Calculate NPV and its derivative
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      npvDerivative -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }

    // Prevent division by zero
    if (Math.abs(npvDerivative) < precision) {
      return undefined; // No solution found
    }

    // Newton-Raphson step
    const newRate = rate - npv / npvDerivative;

    // Check if the result is within the desired precision
    if (Math.abs(newRate - rate) < precision) {
      return newRate;
    }

    rate = newRate;
  }

  // If no solution is found after the maximum iterations
  return undefined;
}
// SECOND APPROACH
// // Calculates the resulting amount
// const _irrResult = function (values: number[], dates: number[], rate: number) {
//   const r = rate + 1;
//   let result = values[0];
//   for (let i = 1; i < values.length; i++) {
//     result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
//   }
//   return result;
// };

// // Calculates the first derivation
// const _irrResultDerivation = function (
//   values: number[],
//   dates: number[],
//   rate: number
// ) {
//   const r = rate + 1;
//   let result = 0;
//   for (let i = 1; i < values.length; i++) {
//     const frac = (dates[i] - dates[0]) / 365;
//     result -= (frac * values[i]) / Math.pow(r, frac + 1);
//   }
//   return result;
// };

// export const calculateIRR = (values: number[], guess: number): number => {
//   // Initialize dates and check values contains at least one positive value and one negative value
//   const dates = [] as number[];
//   let positive = false;
//   let negative = false;
//   for (let i = 0; i < values.length; i++) {
//     dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
//     if (values[i] > 0) positive = true;
//     if (values[i] < 0) negative = true;
//   }

//   // Return error if values does not contain at least one positive value and one negative value
//   if (!positive || !negative) {
//     return NaN;
//   }

//   // Initialize the guess and the resultRate
//   let resultRate = typeof guess === "undefined" ? 0.1 : guess;

//   // Set maximum epsilon for the end of the iteration
//   const epsMax = 1e-10;

//   // Set maximum count of iterations
//   const iterMax = 50;

//   // Implement Newton's method
//   let newRate, epsRate, resultValue;
//   let iteration = 0;
//   let contLoop = true;
//   do {
//     resultValue = _irrResult(values, dates, resultRate);
//     newRate =
//       resultRate -
//       resultValue / _irrResultDerivation(values, dates, resultRate);
//     epsRate = Math.abs(newRate - resultRate);
//     resultRate = newRate;
//     contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
//   } while (contLoop && ++iteration < iterMax);

//   if (contLoop) {
//     return NaN;
//   }

//   // Return internal rate of return
//   return resultRate;
// };

// FIRST APPROACH
// export const calculateIRR = (
//   cashFlows: number[],
//   guess: number = 0.08,
//   initialCosts: number
// ): number | undefined => {
//   console.log(
//     `Initial costs: ${initialCosts}, cashflows: ${cashFlows}, guess: ${guess}`
//   );
//   let x0 = guess;
//   const tolerance = 1e-6; // Use a very small tolerance for more accuracy
//   const maxIterations = 5000;

//   for (let i = 0; i < maxIterations; i++) {
//     // Calculate NPV for the current guess
//     const npv = cashFlows.reduce(
//       (acc, cashFlow, t) => acc + cashFlow / Math.pow(1 + x0, t + 1),
//       -initialCosts
//     );

//     // Calculate the derivative of NPV for Newton's method
//     const derivative = cashFlows.reduce(
//       (acc, cashFlow, t) =>
//         acc - ((t + 1) * cashFlow) / Math.pow(1 + x0, t + 2),
//       0
//     );

//     // Check for convergence
//     if (Math.abs(npv) < tolerance) {
//       console.log(`Root found after ${i} iterations: ${x0}`);
//       return x0; // Root found within tolerance
//     }

//     // Avoid division by zero in Newton's step
//     if (Math.abs(derivative) < tolerance) {
//       console.log("Derivative is too small; no root found.");
//       return; // No root found due to flat curve
//     }

//     // Update the guess using Newton's method
//     const x1 = x0 - npv / derivative;

//     // Check for significant change in guess
//     if (Math.abs(x1 - x0) < tolerance) {
//       console.log(`Converged to solution after ${i} iterations: ${x1}`);
//       return x1; // Converged to solution
//     }

//     x0 = x1; // Prepare for next iteration
//   }

//   console.log(`No root found after max iterations, last guess: ${x0}`);
//   return; // No root found
// };
