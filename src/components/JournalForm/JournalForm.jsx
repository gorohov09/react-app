import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {
	const [inputData, setInputData] = useState('');
	const [state, setState] = useState({
		age: 31
	});

	const inputChange = (event) => {
		setInputData(event.target.value);
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		setState({
			age: ++state.age
		});
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			{state.age}
			<input type='text' name='title'/>
			<input type='date' name='date'/>
			<input type='text' name='tag' onChange={inputChange} value={inputData}/>
			<textarea name='post' id='' rows='10'> /</textarea>
			<Button text={'Сохранить'} onClick={() => console.log('Нажали')}/>
		</form>
	);
}

export default JournalForm;