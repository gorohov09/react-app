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

	const data = [
		{
			title: 'title',
			text: 'text',
			date: new Date()
		},
		{
			title: 'title2',
			text: 'text2',
			date: new Date()
		},
		{
			title: 'title3',
			text: 'text3',
			date: new Date()
		}
	];

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournaList>
					<CardButton>
						<JournalItem
							title={data[0].title}
							text={data[0].text}
							date={data[0].date}
						/>
					</CardButton>
				</JournaList>
			</LeftPanel>

			<Body>
				<JournalForm />
			</Body>
		</div>
	);
}

export default App;
