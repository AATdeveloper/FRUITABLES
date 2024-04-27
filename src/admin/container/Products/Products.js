import React, { useEffect, useState, useStatesetOpen } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from 'react-spinkit';
import { addProducts, deleteProducts, editProducts, getproducts } from '../../../redux/action/products.action';



function Products(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts())
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm(true)
    // setUpdate(false)
  };

  let ProductSchema = object({
    name: string().required(),
    description: string().required(),
    price: number().required()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: ''
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editProducts(values))
      } else {
        dispatch(addProducts(values))
      }

      resetForm();
      handleClose();

    },
  });


  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik;



  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
  }

  const hendalEdit = (data) => {
    formik.setValues(data)
    setUpdate(true)
    setOpen(true)

  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'Price', width: 90 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => hendalEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
  ];


  const products = useSelector(state => state.products);
  console.log(products);

  return (
    <div>

      {
      products.isLoading ? <p>
          <Spinner name="line-scale-pulse-out" color="aqua" />
        </p> :
        products.error ? <p>{products.error}</p> :
          <>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add Product
            </Button>
            <Dialog open={open}
              onClose={handleClose}
            >
              <DialogTitle>Product</DialogTitle>
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="name"
                    name="name"
                    label="Add Product Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name && touched.name ? true : false}
                    helperText={errors.name && touched.name ? errors.name : ''}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Add Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={errors.description && touched.description ? true : false}
                    helperText={errors.description && touched.description ? errors.description : ''}
                  />
                  <TextField
                    margin="dense"
                    id="price"
                    name="price"
                    label="Add Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    error={errors.price && touched.price ? true : false}
                    helperText={errors.price && touched.price ? errors.price : ''}
                  />
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{update ? "Update" : "add"}</Button>
                  </DialogActions>

                </DialogContent>
              </form>
            </Dialog>

            <div style={{ width: '100%' }}>
              <DataGrid
                rows={products.products}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 100]}
                checkboxSelection
              />
            </div>
          </>
      }

    </div>
  );
}

export default Products;