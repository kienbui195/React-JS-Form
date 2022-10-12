import TextField from '@mui/material/TextField';
import { ErrorMessage, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const handleValidate = values => {
	const errors = {};

	if (!values.title) {
		errors.title = 'Required';
	}
	if (!values.quantity) {
		errors.quantity = 'Required';
	} else if (+values.quantity <= 0) {
		errors.quantity = 'Must be bigger than 0!';
	}
	return errors;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const BookManager = () => {
	const [books, setBooks] = useState([]);
	const [data, setData] = useState({
		title: '',
		quantity: '',
	});
	const [status, setStatus] = useState({
		edit: 'none',
		create: 'block',
	});

	const handleEdit = index => {
		setData({
			title: books[index].title,
            quantity: books[index].quantity,
            index: index
        });
        setStatus({
            create: 'none',
            edit: 'block'
        })
	};

    const handleChangeChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleEditEdit = (e) => {
        
        books.splice(data.index, 1, data);
        setBooks([...books]);

        setStatus({
            create: 'block',
            edit: 'none'
        })

        setData({
            title: '',
            quantity: '',
            index: ''
        }) 

        e.preventDefault()
    }

    const handleDelete = index => {
        books.splice(index, 1);
        setBooks([...books])
    };

	return (
		<Grid container spacing={2} columns={10}>
			<Grid xs={4} style={{ display: status.create }}>
				<div>
					<h1>Library</h1>
				</div>
				<Formik
					initialValues={{
						title: '',
						quantity: '',
					}}
					validate={values => handleValidate(values)}
					onSubmit={values => {
						books.push(values);
						setBooks([...books]);
					}}>
					{({ values, errors, touched, handleSubmit, handleChange }) => (
						<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<div>
								<TextField
									name='title'
									label='Title'
									type='text'
									onChange={handleChange}
									helperText={touched.title && errors.title}
									error={touched.title && errors.title}
									value={values.title}
									required
								/>
								<p></p>
							</div>
							<div>
								<TextField
									helperText={errors.quantity && touched.quantity && errors.quantity}
									error={errors.quantity && touched.quantity && errors.quantity}
									name='quantity'
									label='Quantity'
									type='number'
									value={values.quantity}
									onChange={handleChange}
									required
								/>
								<p></p>
							</div>
							<Button variant='outlined' color='success' type='submit'>
								Create
							</Button>
						</Box>
					)}
				</Formik>
			</Grid>
			<Grid xs={4} style={{ display: status.edit }}>
				<div>
					<h1>Edit</h1>
				</div>

				<Box component='form' onSubmit={handleEditEdit} noValidate sx={{ mt: 1 }}>
					<div>
						<TextField
							name='title'
							label='Title'
							type='text'
							onChange={handleChangeChange}
							value={data.title}
							required
						/>
						<p></p>
					</div>
					<div>
						<TextField
							helperText='Required bigger than 0!'
							name='quantity'
							label='Quantity'
							type='number'
							value={data.quantity}
							onChange={handleChangeChange}
							required
						/>
						<p></p>
					</div>
					<Button variant='outlined' color='success' type='submit'>
						Edit
					</Button>
				</Box>
			</Grid>
			<Grid xs={6}>
				<div>
					<TableContainer component={Paper}>
						<Table sx={{ maxWidth: 500 }} aria-label='customized table'>
							<TableHead>
								<TableRow>
									<StyledTableCell>#</StyledTableCell>
									<StyledTableCell align='right'>Title</StyledTableCell>
									<StyledTableCell align='right'>Quantity</StyledTableCell>
									<StyledTableCell align='right'></StyledTableCell>
									<StyledTableCell align='right'></StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{books.map((book, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component='th' scope='row'>
											{index + 1}
										</StyledTableCell>
										<StyledTableCell align='right'>{book.title}</StyledTableCell>
										<StyledTableCell align='right'>{book.quantity}</StyledTableCell>
										<StyledTableCell align='right'>
											<Button variant='contained' color='warning' onClick={() => handleEdit(index)}>
												Edit
											</Button>
										</StyledTableCell>
										<StyledTableCell align='right'>
											<Button variant='contained' color='error' onClick={() => handleDelete(index)}>
												Delete
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</Grid>
		</Grid>
	);
};

export default BookManager;
