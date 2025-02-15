import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { api } from "../services/apiService";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";

const columns = (handleEdit: any, handleDeleteClick: any): GridColDef[] => [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "price", headerName: "Price", type: "number", width: 100 },
  { field: "stock", headerName: "Stock", type: "number", width: 100 },
  { field: "createdAt", headerName: "Created At", width: 150 },
  { field: "updatedAt", headerName: "Updated At", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
    renderCell: (params) => (
      <>
        <Button size="small" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          Delete
        </Button>
      </>
    ),
  },
];

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  // States for Add/Edit Forms
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch products with pagination
  const getAllProducts = async () => {
    setLoading(true)
    try {
      const response = await api.get(
        `/api/products?page=${page + 1}&limit=${pageSize}&search=${searchText}`
      );
      const formattedData = response.data.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdAt: product.created_at
          ? format(new Date(product.created_at), "PP p")
          : "-",
        updatedAt: product.updated_at
          ? format(new Date(product.updated_at), "PP p")
          : "-",
      }));

      setLoading(false)
      setRows(formattedData);
      setTotalRows(response.data.total);
    } catch (err: any) {
      console.error("Failed to fetch products", err.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [page, pageSize, searchText]);

  // Open delete confirmation dialog
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      await api.delete(`/api/products/${deleteId}`);
      toast.success("Product deleted successfully!", { position: "top-right" });
      getAllProducts();
    } catch (err: any) {
      toast.error("Failed to delete product", { position: "top-right" });
    } finally {
      setLoading(false);
      setOpenDeleteDialog(false);
      setDeleteId(null);
    }
  };

  // Handle Open Add/Edit Form
  const handleEdit = (product: any) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
    });
    setOpenForm(true);
  };

  const handleAdd = () => {
    setFormMode("add");
    setFormData({ name: "", description: "", price: "", stock: "" });
    setOpenForm(true);
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmit = async () => {
    try {
      let response;
      setLoading(true);
      if (formMode === "add") {
        response = await api.post("/api/products", formData);
      } else {
        response = await api.put(
          `/api/products/${selectedProduct.id}`,
          formData
        );
      }

      // Show success toast from backend message
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      setOpenForm(false);
      getAllProducts();
      setLoading(false);
    } catch (err: any) {
      console.error("Failed to save product", err.response?.data?.message);
      setLoading(false);
      // Show error toast from backend message
      toast.error(err.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const NoProductsOverlay = () => (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" color="gray">
        No products available
      </Typography>
    </Box>
  );

  return (
    <>
      {/* Search and Add Product */}
      <div className="flex justify-between mb-4">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="border rounded px-3 py-2"
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Product
        </Button>
      </div>
      {/* Data Grid */}
      <Paper sx={{ height: 400, width: "100%" }}>

        <DataGrid
          rows={rows}
          columns={columns(handleEdit, handleDeleteClick)}
          rowCount={totalRows}
          paginationMode="server"
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page);
            setPageSize(newModel.pageSize);
          }}
          slots={{ noRowsOverlay: NoProductsOverlay }}
        />
      </Paper>
      {/* Add/Edit Product Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>
          {formMode === "add" ? "Add Product" : "Edit Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <TextField
            label="Stock"
            type="number"
            fullWidth
            margin="dense"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}  disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {loading ? <CircularProgress size={20} /> : formMode === "add" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
