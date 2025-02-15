import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 150 },
  {
    field: "fullName",
    headerName: "Full Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataTable = () => {
  const [searchText, setSearchText] = useState("");

  // Filter rows based on search input
  const filteredRows = rows.filter(
    (row) =>
      row.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
      row.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
      `${row.firstName} ${row.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  return (
    <>
      {/* Custom Search Filter */}
      <div className="mb-4 relative w-[300px]">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="peer block border w-full rounded bg-white px-3 pt-3 pb-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
        />
        <label
          htmlFor="search"
          className={`absolute left-2 transition-all duration-200 bg-white px-1
                    ${searchText
                      ? "top-[-5px] text-xs text-primary"
                      : "top-[14px] text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-5px] peer-focus:text-xs peer-focus:text-primary"
                    }`}
        >
          Search
        </label>
      </div>

      {/* Data Grid */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10,50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default DataTable;
