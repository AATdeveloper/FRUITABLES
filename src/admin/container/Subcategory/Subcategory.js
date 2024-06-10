import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

// import { deleteSubcategory, getSubData, handleAdd, handleUpdateData, handledelete } from "../../../redux/slice/subcategory.slice";
// import { getCategories } from "../../../redux/action/category.action";
import { deleteSubcategory, getSubData, handleAdd, handleUpdateData} from "../../component/redux/slice/subcategory.slice";
import { getCategories } from "../../component/redux/action/category.action";

function Subcategory() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [update, setUpdate] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    console.log("data: ", data);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const subcategories = useSelector(state => state.subcategories);
    const categories = useSelector(state => state.categories);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };



    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubData());
    }, []);


    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(data._id);
    };

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 150,
            renderCell: (params) => {
                const category = categories.categories?.find((v) => v._id === params.row.category_id);
                // console.log(category);
                return category ? category.name : ''
            }
        },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", flex: 1 },
        {
            field: "Action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    let subcategorySchema = object({
        category_id: string().required("Please select a category"),
        name: string().required("Please enter a name"),
        description: string()
            .required("Please enter a description")
            .min(5, "Please enter at least 5 characters"),
    });

    const formik = useFormik({
        initialValues: {
            category_id: "",
            name: "",
            description: "",
        },
        validationSchema: subcategorySchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                dispatch(handleUpdateData({ ...values, _id: update }));
            } else {
                dispatch(handleAdd(values));
            }

            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue, } = formik;

    const changeSelect = (event) => {
        setFieldValue("category_id", event.target.value);
    };

    const handleDelete = (id) => {
        dispatch(deleteSubcategory(id));
    };

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Subcategory
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subcategory</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                <InputLabel id="category-label">Select Category</InputLabel>
//                             <Select
                                labelId="category-label"
                                id="category"
                                value={values.category_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="category_id"
                            >
//                                 {category.map((category) => (
                                    <MenuItem key={category._id} value={+category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Subcategory Name"
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
                                label="Subcategory Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={
                                    errors.description && touched.description
                                        ? errors.description
                                        : ""
                                }
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? "Update" : "Add"}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={subcategories.subcategories}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </div>
    );
}

export default Subcategory;




















































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
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import { FormControl } from '@mui/material';





// function Subcategory(props) {
//     const [open, setOpen] = React.useState(false);
//     const [data, setData] = React.useState([]);
//     const [update, setUpdate] = React.useState(null);
//     const [category, setCategory] = React.useState([]);



//     let SubcategorySchema = object({
//         name: string().required("please enter name"),
//         description: string().required("please enter discription").min(5, "please enter minimum 5 charactore")

//     });

//     const formik = useFormik({
//         initialValues: {
//             category_id: "",
//             name: "",
//             description: ""

//         },

//         validationSchema: SubcategorySchema,

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
//         formik.handleChange()
//         setUpdate(null)
//     };


//     const getcategorydata = async () => {
//         const response1 = await fetch("http://localhost:8000/api/v1/categories/list-categories");
//         const data = await response1.json();
//         setCategory(data.data)



//     }
//     const getData = async () => {
//         // const localData = JSON.parse(localStorage.getItem("category"));

//         // if (localData) {
//         //     setData(localData)
//         // }

//         try {
//             const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategories")
//             const data = await response.json()

//             console.log(data);
//             setData(data.data)


//         } catch (error) {
//             console.log(error);
//         }


//     }

//     React.useEffect(() => {
//         getcategorydata();
//         getData();
//     }, [])

//     const handleAdd = async (data) => {
//         console.log(data);
//         // let localData = JSON.parse(localStorage.getItem("category"));
//         // let rNo = Math.floor(Math.random() * 1000);

//         // if (localData) {
//         //     localData.push({ ...data, id: rNo });
//         //     localStorage.setItem("category", JSON.stringify(localData));
//         // } else {
//         //     localStorage.setItem("category", JSON.stringify([{ ...data, id: rNo }]));
//         // }

//         try {
//             const response = await fetch("http://localhost:8000/api/v1/subcategories/add-subcategories", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data)





//             });
//             const data1 = await response.json()
//             console.log(data1);



//         } catch (error) {
//             console.log(error);
//         }

//         getData();

//     }

//     const { handleSubmit, handleChange, handleBlur, setValues, errors, touched, values } = formik



//     const hendaldelet = async (data) => {
//         // let localData = JSON.parse(localStorage.getItem("category"));

//         // let fdata = localData.filter((v) => v.id !== data.id)

//         // localStorage.setItem("category", JSON.stringify(fdata));

//         try {
//             await fetch("http://localhost:8000/api/v1/subcategories/delete-subcatagories/" + data._id, {
//                 method: "DELETE",

//             })
//         } catch (error) {
//             console.log(error);
//         }

//         getData()

//     }

//     const hendalEdit = (data) => {
//         setOpen(true);
//         setValues(data)
//         setUpdate(data._id)
//     }

//     const hendalUpdateData = async (data) => {
//         // let localData = JSON.parse(localStorage.getItem("category"));

//         // let index = localData.findIndex((v) => v.id === data.id)

//         // localData[index] = data

//         // localStorage.setItem("category", JSON.stringify(localData));

//         await fetch("http://localhost:8000/api/v1/subcategories/update-subcategories/" + data._id, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })

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
//                     Add Subcategory
//                 </Button>
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}

//                 >

//                     <DialogTitle>Subcategory</DialogTitle>

//                     <form onSubmit={handleSubmit}>
//                         <DialogContent>

//                         <FormControl fullWidth>
//                             <InputLabel id="category-label">Select Category</InputLabel>
//                             <Select
//                                 labelId="category-label"
//                                 id="category"
//                                 value={values.category_id}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 name="category_id"
//                             >
//                                 {category.map((category) => (
//                                     <MenuItem key={category._id} value={+category._id}>
//                                         {category.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                             <TextField
//                                 margin="dense"
//                                 id="name"
//                                 name="name"
//                                 label="Subcategory Name"
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
//                                 label="Subcategory Description"
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
//                     getRowId={row => row._id}
//                 />
//             </div>

//         </div >
//     );
// }

// export default Subcategory;


