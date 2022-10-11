import Register from './components/Register';
import './App.css';
import LoginForm from './components/Login';

function App() {
	return (
		<div className='App'>
			{/* Form register & validate*/}
			<Register />

			{/* Form login & validate*/}
			<LoginForm />
		</div>
	);
}

export default App;
