

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';





function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [update, setUpdate] = React.useState(null)


    let categorySchema = object({
        name: string().required("please enter name"),
        description: string().required("please enter discription").min(5, "please enter minimum 5 charactore")

    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: ""
        },

        validationSchema: categorySchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                hendalUpdateData(values)
            } else {
                handleAdd(values)
            }
            resetForm()
            handleClose()

        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setUpdate(null)
    };

    const getData = async () => {
        // const localData = JSON.parse(localStorage.getItem("category"));

        // if (localData) {
        //     setData(localData)
        // }

        try {
            const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategories")
            const data = await response.json()
            setData(data.data)


        } catch (error) {
            console.log(error);
        }


    }

    React.useEffect(() => {
        getData();
    }, [])

    const handleAdd = async (data) => {
        console.log(data);
        // let localData = JSON.parse(localStorage.getItem("category"));
        // let rNo = Math.floor(Math.random() * 1000);

        // if (localData) {
        //     localData.push({ ...data, id: rNo });
        //     localStorage.setItem("category", JSON.stringify(localData));
        // } else {
        //     localStorage.setItem("category", JSON.stringify([{ ...data, id: rNo }]));
        // }

        try {
           const response =  await fetch("http://localhost:8000/api/v1/subcategories/add-subcategories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)




            });
            const data1 = await response.json()
            console.log(data1);



        } catch (error) {
            console.log(error);
        }

        getData();
    }

    const { handleSubmit, handleChange, handleBlur, setValues, errors, touched, values } = formik



    const hendaldelet = async (data) => {
        // let localData = JSON.parse(localStorage.getItem("category"));

        // let fdata = localData.filter((v) => v.id !== data.id)

        // localStorage.setItem("category", JSON.stringify(fdata));

        try {
            await fetch("http://localhost:8000/api/v1/subcategories/delete-subcatagories/" + data._id, {
                method: "DELETE",
              
            })
        } catch (error) {
            console.log(error);
        }

        getData()

    }

    const hendalEdit = (data) => {
        setOpen(true);
        setValues(data)
        setUpdate(data._id)
    }

    const hendalUpdateData = async(data) => {
        // let localData = JSON.parse(localStorage.getItem("category"));

        // let index = localData.findIndex((v) => v.id === data.id)

        // localData[index] = data

        // localStorage.setItem("category", JSON.stringify(localData));

        await fetch("http://localhost:8000/api/v1/subcategories/update-subcategories/" + data._id,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

        getData()
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => hendalEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => hendaldelet(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        },

    ];

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}

                >
                    <DialogTitle>Category</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Category Name"
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
                                label="Category Description"
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
                                <Button type="submit">{update ? "Update" : "Add"}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={row => row._id}
                />
            </div>

        </div>
    );
}

export default Category;










// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { object, string } from 'yup';
// import { useFormik } from 'formik';
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';





// function Category(props) {
//     const [open, setOpen] = React.useState(false);
//     const [data, setData] = React.useState([]);
//     const [update, setUpdate] = React.useState(null)


//     let categorySchema = object({
//         name: string().required("please enter name"),
//         description: string().required("please enter discription").min(5, "please enter minimum 5 charactore")

//     });

//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             description: ""
//         },

//         validationSchema: categorySchema,

//         onSubmit: (values, { resetForm }) => {
//             if (update) {
//                 hendalUpdateData(values)
//             } else {
//                 handleAdd(values)
//             }
//             resetForm()
//             handleClose()

//         },
//     });

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         formik.resetForm()
//         setUpdate(null)
//     };

//     const getData = () => {
//         const localData = JSON.parse(localStorage.getItem("category"));

//         if (localData) {
//             setData(localData)
//         }
//     }

//     React.useEffect(() => {
//         getData();
//     }, [])

//     const handleAdd = (data) => {
//         console.log(data);
//         let localData = JSON.parse(localStorage.getItem("category"));
//         let rNo = Math.floor(Math.random() * 1000);

//         if (localData) {
//             localData.push({ ...data, id: rNo });
//             localStorage.setItem("category", JSON.stringify(localData));
//         } else {
//             localStorage.setItem("category", JSON.stringify([{ ...data, id: rNo }]));
//         }
//         getData();
//     }

//     const { handleSubmit, handleChange, handleBlur, setValues, errors, touched, values } = formik

//     const hendaldelet = (data) => {
//         let localData = JSON.parse(localStorage.getItem("category"));

//         let fdata = localData.filter((v) => v.id !== data.id)

//         localStorage.setItem("category", JSON.stringify(fdata));

//         getData()

//     }

//     const hendalEdit = (data) => {
//         setOpen(true);
//         setValues(data)
//         setUpdate(data.id)
//     }

//     const hendalUpdateData = (data) => {
//         let localData = JSON.parse(localStorage.getItem("category"));

//         let index = localData.findIndex((v) => v.id === data.id)

//         localData[index] = data

//         localStorage.setItem("category", JSON.stringify(localData));

//         getData()
//     }

//     const columns = [
//         { field: 'name', headerName: 'Name', width: 130 },
//         { field: 'description', headerName: 'Description', width: 130 },
//         {
//             field: 'Action',
//             headerName: 'Action',
//             width: 130,
//             renderCell: (params) => (
//                 <>
//                     <IconButton aria-label="delete" onClick={() => hendalEdit(params.row)}>
//                         <EditIcon />
//                     </IconButton>
//                     <IconButton aria-label="delete" onClick={() => hendaldelet(params.row)}>
//                         <DeleteIcon />
//                     </IconButton>
//                 </>
//             )


//         },

//     ];

//     return (
//         <div>
//             <React.Fragment>
//                 <Button variant="outlined" onClick={handleClickOpen}>
//                     Add Category
//                 </Button>
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}

//                 >
//                     <DialogTitle>Category</DialogTitle>
//                     <form onSubmit={handleSubmit}>
//                         <DialogContent>
//                             <TextField
//                                 margin="dense"
//                                 id="name"
//                                 name="name"
//                                 label="Category Name"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.name}
//                                 error={errors.name && touched.name ? true : false}
//                                 helperText={errors.name && touched.name ? errors.name : ""}

//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="description"
//                                 name="description"
//                                 label="Category Description"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.description}
//                                 error={errors.description && touched.description ? true : false}
//                                 helperText={errors.description && touched.description ? errors.description : ""}
//                             />
//                             <DialogActions>
//                                 <Button onClick={handleClose}>Cancel</Button>
//                                 <Button type="submit">{update ? "Update" : "Add"}</Button>
//                             </DialogActions>
//                         </DialogContent>
//                     </form>
//                 </Dialog>
//             </React.Fragment>

//             <div style={{ width: '100%' }}>
//                 <DataGrid
//                     rows={data}
//                     columns={columns}
//                     initialState={{
//                         pagination: {
//                             paginationModel: { page: 0, pageSize: 5 },
//                         },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                 />
//             </div>

//         </div>
//     );
// }

// export default Category;