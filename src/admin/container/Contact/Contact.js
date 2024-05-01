import React, { useContext, useEffect } from 'react';

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
import { ContactContex, addcontact } from '../../../contex/ContactContex';
import { Contacts } from '@mui/icons-material';

function Contact(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState()
    const dispatch = useDispatch()


    const contact =  useContext(ContactContex)
    console.log(contact);
 

    useEffect(() => {

    }, [])



    const handleClickOpen = () => {
        setOpen(true);
    };





    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true);
        setUpdate(false)

    };

    let contactSchema = object({
        address: string().required(),
        email: string().required(),
        phone: number().required(),


    });


    const formik = useFormik({
        initialValues: {
            address: "",
            email: "",
            phone: ""
        },
        validationSchema: contactSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
       
            } else {
             contact.addContact(values);
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
        { field: 'address', headerName: 'address', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
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
                Add Contact
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
                            id="address"
                            name="address"
                            label="Enter address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            error={errors.address && touched.address ? true : false}
                            helperText={errors.address && touched.address ? errors.address : ""}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Enter email"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : ""}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label=" Enter phone"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={errors.phone && touched.phone ? true : false}
                            helperText={errors.phone && touched.phone ? errors.phone : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? "Update" : "Add"}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={Coupen.coupen}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div> */}
        </div>
    );
}

export default Contact;