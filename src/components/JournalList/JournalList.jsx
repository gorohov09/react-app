import { useContext } from 'react';
import './JournalList.css';
import { UserContext } from '../../context/user.context';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournaList({ items }) {
	const { userId } = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		}

		return -1;
	};

	return (
		<div className="journal-list">
			{userId}
			{
				items.length == 0 
					? <p>Записей нет, добавьте первую</p> 
					: items.filter(item => item.userId == userId).sort(sortItems).map(el => (
						<CardButton key={el.id}>
							<JournalItem
								title={el.title}
								text={el.text}
								date={el.date}
							/>
						</CardButton>
					))
			}
		</div>
	);
}

export default JournaList;