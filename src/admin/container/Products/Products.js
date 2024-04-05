import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Delete_facility, Facility_data, Update_facility } from '../../component/redux/action/facility.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getProducts } from '../../component/redux/action/product.action';


function Products(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState()
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(getProducts())
  },[])

  

  const handleClickOpen = () => {
    setOpen(true);
  };

 



  const handleClose = () => {
    setOpen(false);
    formik.resetForm(true);
    setUpdate(false)

  };

  let productsSchema = object({
    name: string().required(),
    description: string().required(),
    price: string().required(),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: ""
    },
    validationSchema: productsSchema,

    onSubmit: (values, { resetForm }) => {



    },
  });

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik

  const handledelete = (id) => {
    console.log(id);
    dispatch(Delete_facility(id))
  }

  const hendalEdit = (data) => {
    setOpen(true);
    formik.setValues(data)
    setUpdate(data)


  }




  const products = useSelector(state => state.products)
  console.log(products);

  const columns = [
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    { field: 'price', headerName: 'price', width: 130 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => (
        <>

          <IconButton aria-label="delete" onClick={() => hendalEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handledelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )


    },

  ];

  const rows = [

  ];

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Product</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Add Facilites"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name ? true : false}
              helperText={errors.name && touched.name ? errors.name : ""}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Add description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={errors.description && touched.description ? true : false}
              helperText={errors.description && touched.description ? errors.description : ""}
            />
            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Add price"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              error={errors.price && touched.price ? true : false}
              helperText={errors.price && touched.price ? errors.price : ""}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? "Update" : "Add"}</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products.products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default Products;