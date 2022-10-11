import { useState } from 'react';
import { Formik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = props => {
	const regex = {
		name: /^([A-Za-z]{2,})$/,
		password: /^([A-Za-z0-9!@#$%&*]{6,})$/,
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	};

	const [form, setForm] = useState({});
	const [error, setError] = useState({});

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleValidate = () => {
		const errors = {}
		if (!form.name) {
			errors.name = 'Khong duoc de trong!';
		} else if (!regex.name.test(form.name)) {
			errors.name = 'Ten co it nhat 2 ki tu va khong co so!';
		}
		if (!form.email) {
			errors.email ='Khong duoc de trong!';
		} else if (!regex.email.test(form.email)) {
			errors.email ='Sai dinh dang!' ;
		}
		if (!form.password) {
			errors.password = 'Khong duoc de trong!';
		} else if (!regex.password.test(form.password)) {
			errors.password ='It nhat 6 ki tu!' ;
		}

		return errors
	};

	const handleSubmit = e => {
		alert('Login in successfully!!!');
		e.preventDefault();
	};

	return (
		<>
			<div>
				<div>
					<h1>Sign In</h1>
				</div>

				<Formik initialValues={form} validate={handleValidate} onSubmit={handleSubmit}>
					{({ errors, handleSubmit }) => (
						<Box component='form' onSubmit={handleSubmit} autoComplete='off'>
							<div>
								{!errors.name ? (
									<TextField
										id='yourName'
										label='Name'
										name='name'
										type='text'
										value={form.name || ''}
										onChange={handleChange}
										helperText={errors.name}
									/>
								) : (
									<TextField
										id='yourName'
										label='Name'
										name='name'
										type='text'
										value={form.name || ''}
										onChange={handleChange}
										helperText={errors.name}
										error
									/>
								)}

								<p></p>
							</div>
							<div>
								{!errors.email ? (
									<TextField
										id='yourMail'
										label='Email'
										name='email'
										type='email'
										value={form.email || ''}
										onChange={handleChange}
										helperText={errors.email}
									/>
								) : (
									<TextField
										id='yourMail'
										label='Email'
										name='email'
										type='email'
										value={form.email || ''}
										onChange={handleChange}
										helperText={errors.email}
										error
									/>
								)}
								<p></p>
							</div>
							<div>
								{!errors.password ? (
									<TextField
										id='yourPass'
										name='password'
										label='Password'
										type='password'
										value={form.password || ''}
										onChange={handleChange}
										helperText={errors.password}
									/>
								) : (
									<TextField
										id='yourPass'
										name='password'
										label='Password'
										type='password'
										value={form.password || ''}
										onChange={handleChange}
										helperText={errors.password}
										error
									/>
								)}

								<p></p>
							</div>

							<Button type='submit' variant='contained' color='success' style={{ marginTop: '10px' }}>
								Sign In
							</Button>
						</Box>
					)}
				</Formik>
			</div>
		</>
	);
};

export default LoginForm;
