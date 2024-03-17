import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournaList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { UserContextProvider } from './context/user.context';

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = (item, userId) => {
		const id = items == 0 
			? 1
			: Math.max(...items.map(i => i.id)) + 1;

		setItems(oldItems => [...oldItems, {
			title: item.title,
			text: item.post,
			date: new Date(item.date),
			id: id,
			userId: userId
		}]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton />
					<JournaList items={items} />
				</LeftPanel>

				<Body>
					<JournalForm addItem={addItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
