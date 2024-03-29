import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';


function Facility(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let facilitySchema = object({
        name: string().required("please enter name"),
        description: string().required("please enter discription").min(5, "please enter minimum 5 charactore")

    });

    const formik = useFormik({
        initialValues: {
           name : '',
           description : ''
        },

        validationSchema: facilitySchema,

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
              
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik 
    return (
        <div>
            <>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Facility
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    
                >
                    <DialogTitle>FACILITY</DialogTitle>
                    <form onSubmit={handleSubmit}>
                    <DialogContent>

                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label=" Facility"
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
                            label=" Facility description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description ? true : false}
                            helperText={errors.description && touched.description ? errors.description : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">ADD FACILITY</Button>
                        </DialogActions>
                    </DialogContent>

                    </form>

                </Dialog>
            </>
        </div>
    );
}

export default Facility;