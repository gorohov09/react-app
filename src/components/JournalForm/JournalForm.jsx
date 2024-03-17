import { useContext, useEffect, useReducer, useRef } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ addItem }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;

		if (!isValid.date || !isValid.post || !isValid.date) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}

		return  () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			addItem(values, userId);
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const onChangeTitle = (e) => {
		dispatchForm({type: 'SET_TITLE', payload: e.target.value});
	};

	const onChangeDate = (e) => {
		dispatchForm({type: 'SET_DATE', payload: e.target.value});
	};

	const onChangeTag = (e) => {
		dispatchForm({type: 'SET_TAG', payload: e.target.value});
	};

	const onChangePost = (e) => {
		dispatchForm({type: 'SET_POST', payload: e.target.value});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input value={values.title} ref={titleRef} isValid={isValid.title} onChange={onChangeTitle} type='text' name='title' appearence="title"/>
			</div>
			
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря'/>
					<span>Дата</span>
				</label>
				<Input value={values.date} ref={dateRef} isValid={isValid.date} onChange={onChangeDate} type='date' name='date' id='date'/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки'/>
					<span>Метка</span>
				</label>
				<Input value={values.tag} onChange={onChangeTag} type='text' name='tag' id='tag'/>
			</div>
			
			<textarea value={values.post} ref={postRef} onChange={onChangePost} name='post' id='post' rows='10' className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})}/>
			<Button text={'Сохранить'}/>
		</form>
	);
}

export default JournalForm;