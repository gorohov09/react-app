import { useState } from 'react';
import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournaList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {

	const [items, setItems] = useState([]);

	const addItem = (item) => {
		const id = items == 0 
			? 1
			: Math.max(...items.map(i => i.id)) + 1;

		setItems(oldItems => [...oldItems, {
			title: item.title,
			text: item.post,
			date: new Date(item.date),
			id: id
		}]);
	};

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		}

		return -1;
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournaList>
					{
						items.length == 0 
							? <p>Записей нет, добавьте первую</p> 
							: items.sort(sortItems).map(el => (
								<CardButton key={el.id}>
									<JournalItem
										title={el.title}
										text={el.text}
										date={el.date}
									/>
								</CardButton>
							))
					}
				</JournaList>
			</LeftPanel>

			<Body>
				<JournalForm addItem={addItem}/>
			</Body>
		</div>
	);
}

export default App;
