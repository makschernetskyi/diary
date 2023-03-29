import React, { useEffect } from 'react';
import { fetchLastNote } from '../../Redux/slices/home/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Home.module.sass'



export const Home = () => {
	const {lastNote, error} = useSelector(state=> state.home);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const source = axios.CancelToken.source()
		dispatch(fetchLastNote(source))

		return ()=>{
			source.cancel()
		}
	}, [dispatch]);

	useEffect(()=>{
		if(error==="unauthorized"){
			window.location = '/login'
		}
	},[error])

	const handleCalendarClick = () => {
		navigate('/notes')
	}



	return (
		<div className={styles.HomePage}>
			<div className={styles.Calendar} onClick = {handleCalendarClick}>
				Calendar template
			</div>
			<article className={styles.LastNote}>
				<h2>{lastNote?.date}</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea deserunt laboriosam earum tempore ad perferendis suscipit ipsa, distinctio minima pariatur illum cum explicabo amet voluptatibus aut illo rem repudiandae doloremque! Corporis nostrum labore blanditiis est, praesentium quibusdam! Provident quibusdam aspernatur perferendis error quam voluptate commodi culpa, nihil fuga a fugit deleniti sed maxime laboriosam. Dicta hic ex laudantium nobis. Quos assumenda quia hic eveniet dolorem quae debitis, asperiores sunt placeat qui ea dicta officia eos sint aliquam culpa ipsum commodi, voluptatum facilis possimus ab? Iure eum fugiat, reprehenderit quibusdam laborum, voluptatum similique debitis, porro doloribus ad architecto rerum consectetur vel? Id inventore necessitatibus iure magni ab iusto. Dicta magnam porro possimus harum dolorem nihil, quia voluptatibus reiciendis laborum, iusto reprehenderit earum cupiditate eligendi excepturi iure quae ipsam delectus! Earum impedit, quod nesciunt incidunt voluptatum obcaecati omnis totam eos quibusdam vitae, odio illo eveniet optio possimus odit fuga. Earum vitae labore numquam corporis voluptatibus nihil iusto architecto voluptatem sunt asperiores totam, qui ad reprehenderit cupiditate aliquid minima saepe nam. Architecto, dolore. Quia nam doloremque modi facere, quos maiores voluptate culpa quaerat. Optio exercitationem vero sunt, ad modi temporibus earum dicta similique esse officiis cumque rerum qui ab maxime! Quas, tempore fuga quisquam aspernatur libero natus excepturi fugiat autem, labore corporis inventore culpa. Saepe provident rem laboriosam maxime voluptas minima, optio qui iusto dolores debitis, nulla nobis ratione a quasi exercitationem illo eos quod. Velit, repellat quasi. Quo, rerum deleniti. Ad ipsa fugiat enim itaque temporibus modi sequi, eum dolorum harum consequatur, voluptate ut doloremque cum rerum. Minima distinctio porro sint maiores odio alias aliquid velit officia iusto! Saepe est repudiandae dolorum? Laudantium corporis veritatis error ex! Officiis maxime laboriosam, voluptatum veniam dolorum neque? Placeat, saepe omnis repudiandae aspernatur praesentium perspiciatis iure provident animi beatae quod, veritatis magnam fugiat, debitis eius. Distinctio.
				{lastNote?.text}	
				</p>
			</article>
		</div>
	);
}