// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    // PAYE rates for 2024
    const payeRates = [
        { lowerLimit: 0, upperLimit: 24000, rate: 10.0 },
        { lowerLimit: 24001, upperLimit: 32333, rate: 25.0 },
        { lowerLimit: 32334, upperLimit: 500000, rate: 30.0 },
        { lowerLimit: 500001, upperLimit: 800000, rate: 32.5 },
        { lowerLimit: 800001, upperLimit: Infinity, rate: 35.0 }
    ];

    // NHIF rates for 2024
    const nhifRates = [
        { lowerLimit: 0, upperLimit: 5999, deduction: 150 },
        { lowerLimit: 6000, upperLimit: 7999, deduction: 300 },
        { lowerLimit: 8000, upperLimit: 11999, deduction: 400 },
        { lowerLimit: 12000, upperLimit: 14999, deduction: 500 },
        { lowerLimit: 15000, upperLimit: 19999, deduction: 600 },
        { lowerLimit: 20000, upperLimit: 24999, deduction: 750 },
        { lowerLimit: 25000, upperLimit: 29999, deduction: 850 },
        { lowerLimit: 30000, upperLimit: 34999, deduction: 900 },
        { lowerLimit: 35000, upperLimit: 39999, deduction: 950 },
        { lowerLimit: 40000, upperLimit: 44999, deduction: 1000 },
        { lowerLimit: 45000, upperLimit: 49999, deduction: 1100 },
        { lowerLimit: 50000, upperLimit: 59999, deduction: 1200 },
        { lowerLimit: 60000, upperLimit: 69999, deduction: 1300 },
        { lowerLimit: 70000, upperLimit: 79999, deduction: 1400 },
        { lowerLimit: 80000, upperLimit: 89999, deduction: 1500 },
        { lowerLimit: 90000, upperLimit: 99999, deduction: 1600 },
        { lowerLimit: 100000, upperLimit: Infinity, deduction: 1700 }
    ];

    // NSSF rates
    const nssfRateEmployee = 0.06
    const nssfRateEmployer = 0.06  
    const nssfLimitTierI = 6000
    const nssfLimitTierII = 18000

    // Housing Levy
    const housingLevyRate = 0.015

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE
    let paye = 0;
    for (const rate of payeRates) {
        if (grossSalary > rate.lowerLimit && grossSalary <= rate.upperLimit) {
            paye = (grossSalary - rate.lowerLimit) * (rate.rate / 100);
            break;
        }
    }

    // Calculate NHIF
    let nhif = 0;
    for (const rate of nhifRates) {
        if (grossSalary > rate.lowerLimit && grossSalary <= rate.upperLimit) {
            nhif = rate.deduction;
            break;
        }
    }

    // Calculate NSSF
    const nssfEmployee = Math.min(grossSalary * nssfRateEmployee, nssfLimitTierI);
    const nssfEmployer = Math.min(grossSalary * nssfRateEmployer, nssfLimitTierI + nssfLimitTierII);

    // Calculate Housing Levy
    const housingLevy = grossSalary * housingLevyRate;

    // Calculate net salary
    const netSalary = grossSalary - paye - nhif - nssfEmployee;

    // Return the result
    return {
        grossSalary: grossSalary,
        paye: paye,
        nhif: nhif,
        nssfEmployee: nssfEmployee,
        nssfEmployer: nssfEmployer,
        housingLevy: housingLevy,
        netSalary: netSalary
    };
}

// Example usage
const basicSalary = 50000;  // Replace with basic salary
const benefits = 10000;     // Replace with benefits

const result = calculateNetSalary(basicSalary, benefits);

// Display the result
console.log("Gross Salary: " + result.grossSalary);
console.log("PAYE: " + result.paye);
console.log("NHIF: " + result.nhif);
console.log("NSSF Employee Contribution: " + result.nssfEmployee);
console.log("NSSF Employer Contribution: " + result.nssfEmployer);
console.log("Housing Levy: " + result.housingLevy);
console.log("Net Salary: " + result.netSalary);
