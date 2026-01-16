/**
 * KITSW Universal SGPA Calculator - Course Data
 * Based on URR-24 Regulations
 */

// Grading Scale Constants (URR-24)
const GRADE_POINTS = {
    "S": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "P": 4,
    "F": 0,
    "M": 0 // Debarred (Transitional)
};

const BRANCH_MAPPING = {
    "CSE": "Computer Science & Engineering",
    "CSM": "CSE (AI & ML)",
    "CSD": "CSE (Data Science)",
    "CSN": "CSE (Networks)",
    "CSO": "CSE (IoT)",
    "ECE": "Electronics & Comm. Engg",
    "EEE": "Electrical & Electronics Engg",
    "ME": "Mechanical Engineering",
    "IT": "Information Technology"
};

// Course Data (Migrated from Legacy + Placeholders)
// n: Name, c: Credits
const COURSE_DATA = {
    "CSE": {
        "Sem 1": [
            { n: "DCODE", c: 3 },
            { n: "EP", c: 4 },
            { n: "COA", c: 3 },
            { n: "PPSC", c: 4 },
            { n: "BEE", c: 4 },
            { n: "ILMS", c: 1 },
            { n: "Practicum-1", c: 1 },
            { n: "SEA/SAA-1", c: 1 },
            { n: "ETS-1", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", c: 3 },
            { n: "EC", c: 4 },
            { n: "OS", c: 3 },
            { n: "DSTC", c: 4 },
            { n: "ECRW", c: 2 },
            { n: "Sports & Yoga", c: 1 },
            { n: "EGCAD", c: 1 },
            { n: "PSD Lab-1", c: 1 },
            { n: "Practicum-2", c: 1 },
            { n: "SEA/SAA-2", c: 1 },
            { n: "ETS-2", c: 1 }
        ],
        "Sem 3": [
            { n: "SE", c: 3 },
            { n: "TOC", c: 3 },
            { n: "ADS", c: 4 },
            { n: "CN", c: 3 },
            { n: "OOP Through Java", c: 4 },
            { n: "QALR", c: 2 },
            { n: "PSD Lab-2", c: 1 },
            { n: "Practicum-3", c: 1 },
            { n: "SEA/SAA-3", c: 1 },
            { n: "ETS-3", c: 1 }
        ],
        "Sem 4": [
            { n: "DMPS", c: 3 },
            { n: "WP", c: 4 },
            { n: "DBMS", c: 4 },
            { n: "AI", c: 3 },
            { n: "PP", c: 4 },
            { n: "SIS", c: 1 },
            { n: "PSD Lab-3", c: 1 },
            { n: "Practicum-4", c: 1 },
            { n: "SEA/SAA-4", c: 1 },
            { n: "ETS-4", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", c: 3 },
            { n: "ML", c: 4 },
            { n: "Full Stack Dev", c: 4 },
            { n: "CD", c: 4 },
            { n: "S&E Basket", c: 3 },
            { n: "EITK", c: 2 },
            { n: "PSD Lab-4", c: 1 },
            { n: "Tech. English", c: 1 },
            { n: "Seminar", c: 1 },
            { n: "ETS-5", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", c: 3 },
            { n: "CNS", c: 3 },
            { n: "DAA", c: 4 },
            { n: "IOT", c: 4 },
            { n: "MCB", c: 3 },
            { n: "UHV-II", c: 2 },
            { n: "PSD Lab-5", c: 1 },
            { n: "Mini Project", c: 1 },
            { n: "ETS-6", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", c: 3 },
            { n: "P-Elective-II", c: 3 },
            { n: "CC", c: 4 },
            { n: "DL", c: 3 },
            { n: "Blockchain", c: 3 },
            { n: "Internship", c: 1 },
            { n: "Major Project-I", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", c: 3 },
            { n: "P-Elective-III", c: 3 },
            { n: "P-Elective-IV", c: 3 },
            { n: "Major Project-II", c: 6 }
        ]
    },
    "CSM": {
        "Sem 1": [
            { n: "DCODE", c: 3 },
            { n: "EC", c: 4 },
            { n: "STLD", c: 3 },
            { n: "PPSC", c: 4 },
            { n: "ECRW", c: 2 },
            { n: "Sports & Yoga", c: 1 },
            { n: "EGCAD", c: 1 },
            { n: "Practicum-1", c: 1 },
            { n: "SEA/SAA-1", c: 1 },
            { n: "ETS-1", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", c: 3 },
            { n: "EP", c: 4 },
            { n: "COA", c: 3 },
            { n: "DSTC", c: 4 },
            { n: "BEE", c: 4 },
            { n: "ILMS", c: 1 },
            { n: "PSD Lab-1", c: 1 },
            { n: "Practicum-2", c: 1 },
            { n: "SEA/SAA-2", c: 1 },
            { n: "ETS-2", c: 1 }
        ],
        "Sem 3": [
            { n: "EM & SML", c: 3 },
            { n: "ADS", c: 4 },
            { n: "OS", c: 3 },
            { n: "ATCD", c: 3 },
            { n: "OOP Through Java", c: 4 },
            { n: "SIS", c: 1 },
            { n: "PSD Lab-2", c: 1 },
            { n: "Practicum-3", c: 1 },
            { n: "SEA/SAA-3", c: 1 },
            { n: "ETS-3", c: 1 }
        ],
        "Sem 4": [
            { n: "DBMS", c: 4 },
            { n: "AI", c: 3 },
            { n: "SE", c: 3 },
            { n: "CN", c: 3 },
            { n: "PP", c: 4 },
            { n: "QALR", c: 2 },
            { n: "PSD Lab-3", c: 1 },
            { n: "Practicum-4", c: 1 },
            { n: "SEA/SAA-4", c: 1 },
            { n: "ETS-4", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", c: 3 },
            { n: "WP", c: 4 },
            { n: "DAA", c: 3 },
            { n: "ML", c: 4 },
            { n: "M Basket", c: 3 },
            { n: "UHV-II", c: 2 },
            { n: "PSD Lab-4", c: 1 },
            { n: "Tech. English", c: 1 },
            { n: "Seminar", c: 1 },
            { n: "ETS-5", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", c: 3 },
            { n: "CV & IP", c: 3 },
            { n: "DL", c: 4 },
            { n: "DevOps", c: 4 },
            { n: "S&E Basket", c: 3 },
            { n: "EITK", c: 2 },
            { n: "PSD Lab-5", c: 1 },
            { n: "Mini Project", c: 1 },
            { n: "ETS-6", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", c: 3 },
            { n: "P-Elective-II", c: 3 },
            { n: "BDA", c: 4 },
            { n: "CC", c: 3 },
            { n: "EH", c: 3 },
            { n: "Internship", c: 1 },
            { n: "Major Project-I", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", c: 3 },
            { n: "P-Elective-III", c: 3 },
            { n: "P-Elective-IV", c: 3 },
            { n: "Major Project-II", c: 6 }
        ]
    },
    "ME": {
        "Sem 1": [
            { n: "DCODE", c: 3 },
            { n: "EC", c: 4 },
            { n: "TD", c: 3 },
            { n: "PPSC", c: 4 },
            { n: "ECRW", c: 2 },
            { n: "Sports & Yoga", c: 1 },
            { n: "EGCAD", c: 1 },
            { n: "Practicum-1", c: 1 },
            { n: "SEA/SAA-1", c: 1 },
            { n: "ETS-1", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", c: 3 },
            { n: "EP", c: 4 },
            { n: "EM & M", c: 3 },
            { n: "DSTC", c: 4 },
            { n: "BEE", c: 4 },
            { n: "ILMS", c: 1 },
            { n: "PSD Lab-1", c: 1 },
            { n: "Practicum-2", c: 1 },
            { n: "SEA/SAA-2", c: 1 },
            { n: "ETS-2", c: 1 }
        ],
        "Sem 3": [
            { n: "AM", c: 3 },
            { n: "MoM", c: 4 },
            { n: "MT", c: 3 },
            { n: "HPE", c: 3 },
            { n: "PP", c: 4 },
            { n: "SIS", c: 1 },
            { n: "PSD Lab-2", c: 1 },
            { n: "Practicum-3", c: 1 },
            { n: "SEA/SAA-3", c: 1 },
            { n: "ETS-3", c: 1 }
        ],
        "Sem 4": [
            { n: "HT", c: 3 },
            { n: "MD", c: 4 },
            { n: "FM & HM", c: 4 },
            { n: "DME", c: 3 },
            { n: "MT & M", c: 4 },
            { n: "QALR", c: 2 },
            { n: "PSD Lab-3", c: 1 },
            { n: "Practicum-4", c: 1 },
            { n: "SEA/SAA-4", c: 1 },
            { n: "ETS-4", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", c: 3 },
            { n: "R & AC", c: 4 },
            { n: "M & M", c: 3 },
            { n: "AI & ML", c: 4 },
            { n: "M Basket", c: 3 },
            { n: "UHV-II", c: 2 },
            { n: "CAD Lab", c: 1 },
            { n: "Tech. English", c: 1 },
            { n: "Seminar", c: 1 },
            { n: "ETS-5", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", c: 3 },
            { n: "MM & A", c: 4 },
            { n: "DoM", c: 3 },
            { n: "CFD", c: 4 },
            { n: "S&E Basket", c: 3 },
            { n: "EITK", c: 2 },
            { n: "AIML Lab", c: 1 },
            { n: "Mini Project", c: 1 },
            { n: "ETS-6", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", c: 3 },
            { n: "P-Elective-II", c: 3 },
            { n: "FEM", c: 4 },
            { n: "Additive MFG", c: 3 },
            { n: "P & OM", c: 3 },
            { n: "Internship", c: 1 },
            { n: "Major Project-I", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", c: 3 },
            { n: "P-Elective-III", c: 3 },
            { n: "P-Elective-IV", c: 3 },
            { n: "Major Project-II", c: 6 }
        ]
    },
    "CSD": {
        "Sem 1": [
            { n: "DCODE", c: 3 },
            { n: "EC", c: 4 },
            { n: "STLD", c: 3 },
            { n: "PPSC", c: 4 },
            { n: "ECRW", c: 2 },
            { n: "Sports & Yoga", c: 1 },
            { n: "EGCAD", c: 1 },
            { n: "Practicum-1", c: 1 },
            { n: "SEA/SAA-1", c: 1 },
            { n: "ETS-1", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", c: 3 },
            { n: "EP", c: 4 },
            { n: "COA", c: 3 },
            { n: "DSTC", c: 4 },
            { n: "BEE", c: 4 },
            { n: "ILMS", c: 1 },
            { n: "PSD Lab-1", c: 1 },
            { n: "Practicum-2", c: 1 },
            { n: "SEA/SAA-2", c: 1 },
            { n: "ETS-2", c: 1 }
        ],
        "Sem 3": [
            { n: "EM & SD", c: 3 },
            { n: "ADS", c: 4 },
            { n: "OS", c: 3 },
            { n: "ATCD", c: 3 },
            { n: "OOP Through Java", c: 4 },
            { n: "SIS", c: 1 },
            { n: "PSD Lab-2", c: 1 },
            { n: "Practicum-3", c: 1 },
            { n: "SEA/SAA-3", c: 1 },
            { n: "ETS-3", c: 1 }
        ],
        "Sem 4": [
            { n: "DBMS", c: 4 },
            { n: "AI", c: 3 },
            { n: "SE", c: 3 },
            { n: "CN", c: 3 },
            { n: "PP", c: 4 },
            { n: "QALR", c: 2 },
            { n: "PSD Lab-3", c: 1 },
            { n: "Practicum-4", c: 1 },
            { n: "SEA/SAA-4", c: 1 },
            { n: "ETS-4", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", c: 3 },
            { n: "WP", c: 4 },
            { n: "DAA", c: 3 },
            { n: "ML", c: 4 },
            { n: "M Basket", c: 3 },
            { n: "UHV-II", c: 2 },
            { n: "PSD Lab-4", c: 1 },
            { n: "Tech. English", c: 1 },
            { n: "Seminar", c: 1 },
            { n: "ETS-5", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", c: 3 },
            { n: "CV & IP", c: 3 },
            { n: "DL", c: 4 },
            { n: "DevOps", c: 4 },
            { n: "S&E Basket", c: 3 },
            { n: "EITK", c: 2 },
            { n: "PSD Lab-5", c: 1 },
            { n: "Mini Project", c: 1 },
            { n: "ETS-6", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", c: 3 },
            { n: "P-Elective-II", c: 3 },
            { n: "BDA", c: 4 },
            { n: "CC", c: 3 },
            { n: "EH", c: 3 },
            { n: "Internship", c: 1 },
            { n: "Major Project-I", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", c: 3 },
            { n: "P-Elective-III", c: 3 },
            { n: "P-Elective-IV", c: 3 },
            { n: "Major Project-II", c: 6 }
        ]
    },
    "ECE": {
        "Sem 1": [
            { n: "DCODE", c: 3 },
            { n: "EP", c: 4 },
            { n: "STLD", c: 3 },
            { n: "PPSC", c: 4 },
            { n: "BEE", c: 4 },
            { n: "ILMS", c: 1 },
            { n: "Practicum-1", c: 1 },
            { n: "SEA/SAA-1", c: 1 },
            { n: "ETS-1", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", c: 3 },
            { n: "EC", c: 4 },
            { n: "Electronic Circuits", c: 3 },
            { n: "DSTC", c: 4 },
            { n: "ECRW", c: 2 },
            { n: "Sports & Yoga", c: 1 },
            { n: "EGCAD", c: 1 },
            { n: "PSD Lab-1", c: 1 },
            { n: "Practicum-2", c: 1 },
            { n: "SEA/SAA-2", c: 1 },
            { n: "ETS-2", c: 1 }
        ],
        "Sem 3": [
            { n: "AM", c: 3 },
            { n: "ECAD", c: 4 },
            { n: "DD", c: 4 },
            { n: "SS", c: 3 },
            { n: "OOP Through Java", c: 4 },
            { n: "QALR", c: 2 },
            { n: "PSD Lab-2", c: 1 },
            { n: "Practicum-3", c: 1 },
            { n: "SEA/SAA-3", c: 1 },
            { n: "ETS-3", c: 1 }
        ],
        "Sem 4": [
            { n: "ICA", c: 4 },
            { n: "CS", c: 4 },
            { n: "EMWTL", c: 3 },
            { n: "COMP", c: 3 },
            { n: "PP", c: 4 },
            { n: "SIS", c: 1 },
            { n: "PSD Lab-3", c: 1 },
            { n: "Practicum-4", c: 1 },
            { n: "SEA/SAA-4", c: 1 },
            { n: "ETS-4", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", c: 3 },
            { n: "Mb-ESARM", c: 4 },
            { n: "AWP", c: 3 },
            { n: "AI&ML", c: 4 },
            { n: "S&E Basket", c: 3 },
            { n: "EITK", c: 2 },
            { n: "PSD Lab-4", c: 1 },
            { n: "Tech. English", c: 1 },
            { n: "Seminar", c: 1 },
            { n: "ETS-5", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", c: 3 },
            { n: "DSPA", c: 4 },
            { n: "VLSI", c: 4 },
            { n: "DC & CN", c: 3 },
            { n: "MCB", c: 3 },
            { n: "UHV-II", c: 2 },
            { n: "AIML Lab", c: 1 },
            { n: "Mini Project", c: 1 },
            { n: "ETS-6", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", c: 3 },
            { n: "P-Elective-II", c: 3 },
            { n: "SVDV", c: 4 },
            { n: "MOFC", c: 3 },
            { n: "WMC", c: 3 },
            { n: "Internship", c: 1 },
            { n: "Major Project-I", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", c: 3 },
            { n: "P-Elective-III", c: 3 },
            { n: "P-Elective-IV", c: 3 },
            { n: "Major Project-II", c: 6 }
        ]
    },
    "IT": {
        "Sem 1": [
            { n: "DCODE", c: 3 },
            { n: "EC", c: 4 },
            { n: "DLD", c: 3 },
            { n: "PPSC", c: 4 },
            { n: "ECRW", c: 2 },
            { n: "Sports & Yoga", c: 1 },
            { n: "EGCAD", c: 1 },
            { n: "Practicum-1", c: 1 },
            { n: "SEA/SAA-1", c: 1 },
            { n: "ETS-1", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", c: 3 },
            { n: "EP", c: 4 },
            { n: "COA", c: 3 },
            { n: "DSTC", c: 4 },
            { n: "BEE", c: 4 },
            { n: "ILMS", c: 1 },
            { n: "PSD Lab-1", c: 1 },
            { n: "Practicum-2", c: 1 },
            { n: "SEA/SAA-2", c: 1 },
            { n: "ETS-2", c: 1 }
        ],
        "Sem 3": [
            { n: "AI", c: 3 },
            { n: "ADS", c: 4 },
            { n: "SE", c: 3 },
            { n: "DBMS", c: 4 },
            { n: "OOP Through Java", c: 4 },
            { n: "SIS", c: 1 },
            { n: "PSD Lab-2", c: 1 },
            { n: "Practicum-3", c: 1 },
            { n: "SEA/SAA-3", c: 1 },
            { n: "ETS-3", c: 1 }
        ],
        "Sem 4": [
            { n: "DMPS", c: 3 },
            { n: "DAA", c: 4 },
            { n: "PP", c: 4 },
            { n: "OS", c: 4 },
            { n: "CN", c: 3 },
            { n: "QALR", c: 2 },
            { n: "PSD Lab-3", c: 1 },
            { n: "Practicum-4", c: 1 },
            { n: "SEA/SAA-4", c: 1 },
            { n: "ETS-4", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", c: 3 },
            { n: "ML", c: 4 },
            { n: "Information Security", c: 3 },
            { n: "Intro to IOT", c: 4 },
            { n: "M Basket", c: 3 },
            { n: "UHV-II", c: 2 },
            { n: "PSD Lab-4", c: 1 },
            { n: "Tech. English", c: 1 },
            { n: "Seminar", c: 1 },
            { n: "ETS-5", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", c: 3 },
            { n: "Data Science", c: 3 },
            { n: "CC", c: 4 },
            { n: "Full Stack w Java", c: 4 },
            { n: "S&E Basket", c: 3 },
            { n: "EITK", c: 2 },
            { n: "PSD Lab-5", c: 1 },
            { n: "Mini Project", c: 1 },
            { n: "ETS-6", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", c: 3 },
            { n: "P-Elective-II", c: 3 },
            { n: "DevOps", c: 4 },
            { n: "BDA", c: 3 },
            { n: "ST & QA", c: 3 },
            { n: "Internship", c: 1 },
            { n: "Major Project-I", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", c: 3 },
            { n: "P-Elective-III", c: 3 },
            { n: "P-Elective-IV", c: 3 },
            { n: "Major Project-II", c: 6 }
        ]
    }
};

// Populate missing semesters/branches with placeholders to avoid crashes
const COMMON_SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];
const ALL_BRANCHES = Object.keys(BRANCH_MAPPING);

ALL_BRANCHES.forEach(branch => {
    if (!COURSE_DATA[branch]) COURSE_DATA[branch] = {};
    COMMON_SEMESTERS.forEach(sem => {
        if (!COURSE_DATA[branch][sem]) {
            COURSE_DATA[branch][sem] = [
                { n: `Course 1 (${branch} ${sem})`, c: 3 },
                { n: `Course 2 (${branch} ${sem})`, c: 3 },
                { n: `Course 3 (${branch} ${sem})`, c: 4 },
                { n: `Course 4 (${branch} ${sem})`, c: 4 },
                { n: `Lab 1 (${branch} ${sem})`, c: 1.5 },
                { n: `Lab 2 (${branch} ${sem})`, c: 1.5 }
            ];
        }
    });
});
