import Register from './components/Register';
import './App.css';
import LoginForm from './components/Login';
import BookManager from './pages/BookManager';

function App() {
	return (
		<div className='App'>
			{/* Form register & validate*/}
			<Register />

			{/* Form login & validate*/}
			<LoginForm />

			{/* BookManager & Validate */}
			<BookManager/>
		</div>
	);
}

export default App;
