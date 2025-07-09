import { create } from 'zustand';
import * as XLSX from 'xlsx';

const allStaticCases = [
  {
    id: '1',
    caseNumber: 'CR-2023-001',
    defendant: 'John Doe',
    offense: 'Theft',
    status: 'Pending',
    dateFiled: '2023-01-15',
    court: 'Regional Trial Court',
    judge: 'Hon. Maria Santos',
    nextHearing: '2024-07-20',
  },
  {
    id: '2',
    caseNumber: 'CR-2023-002',
    defendant: 'Jane Smith',
    offense: 'Assault',
    status: 'Closed',
    dateFiled: '2023-02-01',
    court: 'Municipal Trial Court',
    judge: 'Hon. Jose Reyes',
    nextHearing: 'N/A',
  },
  {
    id: '3',
    caseNumber: 'CR-2023-003',
    defendant: 'Peter Jones',
    offense: 'Fraud',
    status: 'In Progress',
    dateFiled: '2023-03-10',
    court: 'Regional Trial Court',
    judge: 'Hon. Maria Santos',
    nextHearing: '2024-08-05',
  },
  {
    id: '4',
    caseNumber: 'CR-2023-004',
    defendant: 'Alice Brown',
    offense: 'Drug Possession',
    status: 'Pending',
    dateFiled: '2023-04-22',
    court: 'Regional Trial Court',
    judge: 'Hon. David Lee',
    nextHearing: '2024-07-25',
  },
  {
    id: '5',
    caseNumber: 'CR-2023-005',
    defendant: 'Robert White',
    offense: 'Homicide',
    status: 'In Progress',
    dateFiled: '2023-05-01',
    court: 'Regional Trial Court',
    judge: 'Hon. Maria Santos',
    nextHearing: '2024-09-10',
  },
  {
    id: '5',
    caseNumber: 'CR-2023-005',
    defendant: 'Robert White',
    offense: 'Homicide',
    status: 'In Progress',
    dateFiled: '2023-05-01',
    court: 'Regional Trial Court',
    judge: 'Hon. Maria Santos',
    nextHearing: '2024-09-10',
  },
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
    if (loading || !hasMore) return;

    set({ loading: true });

    const start = (page - 1) * PAGE_SIZE;
    const end = page * PAGE_SIZE;

    setTimeout(() => {
      const filtered = allStaticCases.filter((item) =>
        Object.values(item).some((v) =>
          String(v).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      const nextSlice = filtered.slice(start, end);
      set((state) => ({
        cases: [...state.cases, ...nextSlice],
        page: state.page + 1,
        hasMore: end < filtered.length,
        loading: false,
      }));
    }, 500);
  },

  resetCases: () => {
    set({
      cases: [],
      page: 1,
      hasMore: true,
    });
    get().fetchMoreCases();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term, page: 1, cases: [], hasMore: true });
    get().fetchMoreCases();
  },

  setCases: (newCases) => set({ cases: newCases }),
  downloadCriminalCase: () => {
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
