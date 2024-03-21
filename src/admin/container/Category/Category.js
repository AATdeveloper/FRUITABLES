
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';




export default function FormDialog() {

   
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <React.Fragment>

            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>CATEGORY</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="Category_name"
                        name="Category_name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        error={errors.category && touched.category ? errors.category: false}
                        helperText={errors.category && touched.category ? errors.category: ''}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="Category_description"
                        name="Category_description"
                        label="Category Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        error={errors.category && touched.category ? errors.category: false}
                        helperText={errors.category && touched.category ? errors.category: ''}

                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">ADD</Button>
                    </DialogActions>
                </DialogContent>


            </Dialog>
        </React.Fragment>
    );
}

