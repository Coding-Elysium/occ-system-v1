import { create } from 'zustand';
import * as XLSX from 'xlsx';
// This is static data for demonstration. In a real app, this would come from an API.
const allStaticCases = [
  { id: '1', caseNumber: 'CR-001', defendant: 'John Doe', offense: 'Theft', status: 'Pending', dateFiled: '2023-01-15', court: 'District Court', judge: 'Judge Smith', nextHearing: '2024-07-20' },
  { id: '2', caseNumber: 'CR-002', defendant: 'Jane Smith', offense: 'Assault', status: 'Closed', dateFiled: '2023-02-01', court: 'Circuit Court', judge: 'Judge Jones', nextHearing: '-' },
  { id: '3', caseNumber: 'CR-003', defendant: 'Peter Pan', offense: 'Fraud', status: 'Active', dateFiled: '2023-03-10', court: 'High Court', judge: 'Judge Brown', nextHearing: '2024-08-01' },
  { id: '4', caseNumber: 'CR-004', defendant: 'Alice Wonderland', offense: 'Vandalism', status: 'Pending', dateFiled: '2023-04-05', court: 'District Court', judge: 'Judge White', nextHearing: '2024-07-25' },
  // { id: '5', caseNumber: 'CR-005', defendant: 'Bob The Builder', offense: 'Arson', status: 'Closed', dateFiled: '2023-05-20', court: 'Circuit Court', judge: 'Judge Green', nextHearing: '-' },
  // { id: '6', caseNumber: 'CR-006', defendant: 'Charlie Chaplin', offense: 'Forgery', status: 'Active', dateFiled: '2023-06-12', court: 'High Court', judge: 'Judge Black', nextHearing: '2024-08-15' },
  // { id: '7', caseNumber: 'CR-007', defendant: 'Diana Prince', offense: 'Embezzlement', status: 'Pending', dateFiled: '2023-07-01', court: 'District Court', judge: 'Judge Red', nextHearing: '2024-07-30' },
  // { id: '8', caseNumber: 'CR-008', defendant: 'Bruce Wayne', offense: 'Tax Evasion', status: 'Closed', dateFiled: '2023-08-18', court: 'Circuit Court', judge: 'Judge Blue', nextHearing: '-' },
  // { id: '9', caseNumber: 'CR-009', defendant: 'Clark Kent', offense: 'Cybercrime', status: 'Active', dateFiled: '2023-09-25', court: 'High Court', judge: 'Judge Yellow', nextHearing: '2024-08-20' },
  // { id: '10', caseNumber: 'CR-010', defendant: 'Lois Lane', offense: 'Perjury', status: 'Pending', dateFiled: '2023-10-03', court: 'District Court', judge: 'Judge Purple', nextHearing: '2024-08-05' },
  // { id: '11', caseNumber: 'CR-011', defendant: 'Lex Luthor', offense: 'Conspiracy', status: 'Active', dateFiled: '2023-11-11', court: 'Circuit Court', judge: 'Judge Orange', nextHearing: '2024-08-25' },
  // { id: '12', caseNumber: 'CR-012', defendant: 'Barry Allen', offense: 'Speeding', status: 'Closed', dateFiled: '2023-12-01', court: 'District Court', judge: 'Judge Indigo', nextHearing: '-' },
  // { id: '13', caseNumber: 'CR-013', defendant: 'Oliver Queen', offense: 'Vigilantism', status: 'Pending', dateFiled: '2024-01-05', court: 'High Court', judge: 'Judge Magenta', nextHearing: '2024-08-10' },
  // { id: '14', caseNumber: 'CR-014', defendant: 'Hal Jordan', offense: 'Reckless Endangerment', status: 'Active', dateFiled: '2024-02-14', court: 'Circuit Court', judge: 'Judge Cyan', nextHearing: '2024-08-30' },
  // { id: '15', caseNumber: 'CR-015', defendant: 'Arthur Curry', offense: 'Illegal Fishing', status: 'Closed', dateFiled: '2024-03-22', court: 'District Court', judge: 'Judge Lime', nextHearing: '-' },
  // { id: '16', caseNumber: 'CR-016', defendant: 'Victor Stone', offense: 'Hacking', status: 'Pending', dateFiled: '2024-04-01', court: 'High Court', judge: 'Judge Teal', nextHearing: '2024-08-12' },
  // { id: '17', caseNumber: 'CR-017', defendant: 'Shazam', offense: 'Public Nuisance', status: 'Active', dateFiled: '2024-05-09', court: 'Circuit Court', judge: 'Judge Olive', nextHearing: '2024-09-05' },
  // { id: '18', caseNumber: 'CR-018', defendant: 'Billy Batson', offense: 'Minor Offense', status: 'Closed', dateFiled: '2024-06-16', court: 'District Court', judge: 'Judge Maroon', nextHearing: '-' },
  // { id: '19', caseNumber: 'CR-019', defendant: 'Harley Quinn', offense: 'Disorderly Conduct', status: 'Pending', dateFiled: '2024-06-20', court: 'High Court', judge: 'Judge Navy', nextHearing: '2024-08-18' },
  // { id: '20', caseNumber: 'CR-020', defendant: 'Poison Ivy', offense: 'Environmental Damage', status: 'Active', dateFiled: '2024-06-25', court: 'Circuit Court', judge: 'Judge Gold', nextHearing: '2024-09-10' },
];

const PAGE_SIZE = 10;

const useCriminalCaseStore = create((set, get) => ({
  cases: [],
  page: 1,
  hasMore: true,
  loading: false,
  searchTerm: '',

  fetchMoreCases: () => {
    const { page, loading, hasMore, searchTerm } = get();
    if (loading || !hasMore) return; // Prevent fetching if already loading or no more data

    set({ loading: true });
    // Simulate network delay
    setTimeout(() => {
      const filtered = allStaticCases.filter((item) =>
        Object.values(item).some((v) =>
          String(v).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const start = (page - 1) * PAGE_SIZE;
      const end = page * PAGE_SIZE;
      const nextSlice = filtered.slice(start, end);

      set((state) => ({
        cases: [...state.cases, ...nextSlice],
        page: state.page + 1,
        hasMore: end < filtered.length, // Check if there are more items to load
        loading: false,
      }));
    }, 500); // Simulate 500ms API call
  },

  resetCases: () => {
    // Resets the state for a fresh load or search
    set({
      cases: [],
      page: 1,
      hasMore: true,
      loading: false, // Ensure loading is false when reset
    });
  },

  setSearchTerm: (term) => {
    // When search term changes, reset state and then the component will trigger fetch
    set({ searchTerm: term, page: 1, cases: [], hasMore: true, loading: false });
  },

  setCases: (newCases) => set({ cases: newCases }), // Unused in this context, but kept
  downloadCriminalCase: () => {
    // This function assumes XLSX is globally available or imported.
    // For a React app, you'd typically import it: import * as XLSX from 'xlsx';
    const cases = get().cases;
    const sheetData = [
      [
        "Case No.",
        "Defendant",
        "Offense",
        "Status",
        "Date Filed",
        "Court",
        "Judge",
        "Next Hearing"
      ],
      ...cases.map(caseItem => [
        caseItem.caseNumber,
        caseItem.defendant,
        caseItem.offense,
        caseItem.status,
        caseItem.dateFiled,
        caseItem.court,
        caseItem.judge,
        caseItem.nextHearing
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    const maxColWidths = sheetData[0].map((_, colIdx) =>
      Math.max(...sheetData.map(row => (row[colIdx] ? row[colIdx].toString().length : 10)))
    );

    worksheet["!cols"] = maxColWidths.map(w => ({ wch: w + 5 }));
    worksheet["!freeze"] = { xSplit: 0, ySplit: 1 };

    Object.keys(worksheet).forEach(cell => {
      if (!cell.startsWith("!")) {
        const cellRef = XLSX.utils.decode_cell(cell);
        if (cellRef.r === 0) {
          worksheet[cell].s = {
            font: { bold: true },
            alignment: { vertical: "center", horizontal: "center" }
          };
        } else {
          worksheet[cell].s = {
            alignment: { vertical: "center", horizontal: "left" }
          };
        }
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Criminal Cases");

    XLSX.writeFile(workbook, "criminal_cases.xlsx", {
      cellStyles: true
    });
  }
}));

export default useCriminalCaseStore;


// GET /api/cases?page=1&limit=10&search=theft


// import { create } from 'zustand';
// import * as XLSX from 'xlsx';
// import axios from 'axios';

// const PAGE_SIZE = 10;

// const useCriminalCaseStore = create((set, get) => ({
//   cases: [],
//   page: 1,
//   hasMore: true,
//   loading: false,
//   searchTerm: '',

//   fetchMoreCases: async () => {
//     const { page, loading, hasMore, searchTerm } = get();
//     if (loading || !hasMore) return;

//     set({ loading: true });

//     try {
//       const response = await axios.get('/api/cases', {
//         params: {
//           page,
//           limit: PAGE_SIZE,
//           search: searchTerm,
//         },
//       });

//       const fetchedCases = response.data.cases;

//       set((state) => ({
//         cases: [...state.cases, ...fetchedCases],
//         page: state.page + 1,
//         hasMore: fetchedCases.length === PAGE_SIZE,
//         loading: false,
//       }));
//     } catch (error) {
//       console.error('Error fetching cases:', error);
//       set({ loading: false });
//     }
//   },

//   resetCases: () => {
//     set({
//       cases: [],
//       page: 1,
//       hasMore: true,
//     });
//     get().fetchMoreCases();
//   },

//   setSearchTerm: (term) => {
//     set({ searchTerm: term, page: 1, cases: [], hasMore: true });
//     get().fetchMoreCases();
//   },

//   setCases: (newCases) => set({ cases: newCases }),

//   downloadCriminalCase: () => {
//     const cases = get().cases;
//     const sheetData = [
//       [
//         'Case No.',
//         'Defendant',
//         'Offense',
//         'Status',
//         'Date Filed',
//         'Court',
//         'Judge',
//         'Next Hearing',
//       ],
//       ...cases.map((caseItem) => [
//         caseItem.caseNumber,
//         caseItem.defendant,
//         caseItem.offense,
//         caseItem.status,
//         caseItem.dateFiled,
//         caseItem.court,
//         caseItem.judge,
//         caseItem.nextHearing,
//       ]),
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
//     const maxColWidths = sheetData[0].map((_, colIdx) =>
//       Math.max(...sheetData.map(row => (row[colIdx] ? row[colIdx].toString().length : 10)))
//     );

//     worksheet["!cols"] = maxColWidths.map(w => ({ wch: w + 5 }));
//     worksheet["!freeze"] = { xSplit: 0, ySplit: 1 };

//     Object.keys(worksheet).forEach(cell => {
//       if (!cell.startsWith("!")) {
//         const cellRef = XLSX.utils.decode_cell(cell);
//         if (cellRef.r === 0) {
//           worksheet[cell].s = {
//             font: { bold: true },
//             alignment: { vertical: "center", horizontal: "center" }
//           };
//         } else {
//           worksheet[cell].s = {
//             alignment: { vertical: "center", horizontal: "left" }
//           };
//         }
//       }
//     });

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Criminal Cases");

//     XLSX.writeFile(workbook, "criminal_cases.xlsx", {
//       cellStyles: true
//     });
//   }
// }));

// export default useCriminalCaseStore;
