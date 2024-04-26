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
import { addCoupen, deleteCoupen, deleteCoupon, editCoupen, editCoupon, getCoupen, getCoupon } from '../../component/redux/slice/coupen.slice';

function Coupen(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState()
  const dispatch = useDispatch()

  const coupen = useSelector((state) => state.coupen);
  console.log(coupen);

  useEffect(() => {
    dispatch(getCoupen())
  }, [])



  const handleClickOpen = () => {
    setOpen(true);
  };





  const handleClose = () => {
    setOpen(false);
    formik.resetForm(true);
    setUpdate(false)

  };

  let coupensSchema = object({
    coupen: string().required(),
    percentage: number().required(),
    expiry: date().required(),


  });

  
  const formik = useFormik({
    initialValues: {
      coupen: "",
      percentage: "",
      expiry: ""
    },
    validationSchema: coupensSchema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        dispatch(editCoupen(values));
      } else {
        dispatch(addCoupen(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik

  const handleDelete = (id) => {
    dispatch(deleteCoupen(id));
  };
  const handleEdit = (data) => {
    formik.setValues(data);
    setUpdate(true);
    setOpen(true);
  };



  const coupens = useSelector(state => state.coupen)
  console.log(coupens);



  const columns = [
    { field: 'coupen', headerName: 'Coupen', width: 130 },
    { field: 'percentage', headerName: 'Percentage', width: 130 },
    { field: 'expiry', headerName: 'Expiry', width: 130 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,
      renderCell: ( params ) => (
        <>

          <IconButton onClick={() => handleEdit(params.row)} variant="contained">
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)} variant="contained">
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
        Add Coupen
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Coupen</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="Coupen"
              name="coupen"
              label="coupen"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.coupen}
              error={errors.coupen && touched.coupen ? true : false}
              helperText={errors.coupen && touched.coupen ? errors.coupen : ""}
            />
            <TextField
              margin="dense"
              id="percentage"
              name="percentage"
              label="Coupen percentage"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.percentage}
              error={errors.percentage && touched.percentage ? true : false}
              helperText={errors.percentage && touched.percentage ? errors.percentage : ""}
            />
            <TextField
              margin="dense"
              id="expiry"
              name="expiry"
              label=" Coupen expiry"
              type="date"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.expiry}
              error={errors.expiry && touched.expiry ? true : false}
              helperText={errors.expiry && touched.expiry ? errors.expiry : ""}
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
          rows={coupen.coupen}
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

export default Coupen;