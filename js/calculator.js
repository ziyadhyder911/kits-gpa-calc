/**
 * KITSW Universal SGPA Calculator - Logic
 */

const Calculator = {
    /**
     * Calculates SGPA based on URR-24 Regulation.
     * Rule: F-Grade credits are NOT included in both numerator (Points) and denominator (Credits).
     * @param {Array} grades - Array of objects { credits: number, gradePoint: number }
     * @returns {Object} { sgpa, totalCredits, clearedCredits }
     */
    calculateSGPA: (grades) => {
        let totalPoints = 0;
        let clearedCredits = 0;
        let totalRegisteredCredits = 0;

        grades.forEach(g => {
            totalRegisteredCredits += g.credits;

            // URR-24 12.11: SGPA/CGPA calculated considering ONLY credits cleared
            if (g.gradePoint > 0) { // F=0, so this excludes F
                totalPoints += (g.credits * g.gradePoint);
                clearedCredits += g.credits;
            }
        });

        const sgpa = clearedCredits === 0 ? 0 : totalPoints / clearedCredits;

        return {
            sgpa: parseFloat(sgpa.toFixed(2)),
            clearedCredits: parseFloat(clearedCredits.toFixed(1)),
            totalRegisteredCredits: parseFloat(totalRegisteredCredits.toFixed(1))
        };
    },

    /**
     * Converts CGPA to Percentage (URR-24 17.4a)
     * Formula: (CGPA - 0.50) * 10
     * @param {number} cgpa 
     * @returns {number} percentage
     */
    cgpaToPercentage: (cgpa) => {
        if (cgpa < 0.5) return 0;
        return parseFloat(((cgpa - 0.50) * 10).toFixed(1));
    },

    /**
     * Calculates required SGPA for next semester to reach target CGPA
     * @param {number} currentCGPA 
     * @param {number} currentCredits - Total credits cleared so far
     * @param {number} targetCGPA 
     * @param {number} nextSemCredits - Credits in the upcoming semester
     * @returns {number|string} Required SGPA or "Impossible"
     */
    calculateTargetSGPA: (currentCGPA, currentCredits, targetCGPA, nextSemCredits) => {
        // (CurrentCGPA * CurrentCredits) + (RequiredSGPA * NextCredits) = TargetCGPA * (CurrentCredits + NextCredits)
        // RequiredSGPA = [ TargetCGPA * (CurrentCredits + NextCredits) - (CurrentCGPA * CurrentCredits) ] / NextCredits

        const totalCredits = currentCredits + nextSemCredits;
        const requiredPoints = (targetCGPA * totalCredits) - (currentCGPA * currentCredits);
        const requiredSGPA = requiredPoints / nextSemCredits;

        if (requiredSGPA > 10) return "Impossible (>10)";
        if (requiredSGPA < 0) return "Already Achieved";

        return parseFloat(requiredSGPA.toFixed(2));
    }
};
