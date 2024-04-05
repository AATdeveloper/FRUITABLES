import React from 'react';

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


function Facilites(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState()
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true);
        setUpdate(false)

    };

    let facilitesSchema = object({
        name: string().required(),
        discription: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            discription: "",
        },
        validationSchema: facilitesSchema,

        onSubmit: (values, { resetForm }) => {

            if (update) {
                dispatch(Update_facility(values))
            } else {
                const rno = Math.floor(Math.random() * 1000);
                dispatch(Facility_data({ ...values, id: rno }))
            }
            resetForm();
            handleClose();

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




    const facilites = useSelector(state => state.facility)
    console.log(facilites);

    const columns = [
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'discription', headerName: 'discription', width: 130 },
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
                Add Facilites
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Facilites</DialogTitle>
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
                            id="discription"
                            name="discription"
                            label="Add Discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discription}
                            error={errors.discription && touched.discription ? true : false}
                            helperText={errors.discription && touched.discription ? errors.discription : ""}
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
                    rows={facilites.facilites}
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

export default Facilites;