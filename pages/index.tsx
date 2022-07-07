import { shuffle } from '../utils/shuffle';
import { useCallback, useState } from 'react';
import { graphcms } from '../api/graphCMS';
import Question from '../components/Question';
import Grid from '../components/Grid';
import QUESTIONS_QUERY from '../src/queries/questions.graphql';
import Navigation from '../components/Navigation';
import { Question as QuestionType } from '../graphql/generated';
import ShuffleButton from '../components/ShuffleButton';

type PageProps = { questions: QuestionType[] };

export default function Home({ questions }: PageProps) {
	const [sortedQuestions, setSortedQuestions] =
		useState<QuestionType[]>(questions);

	const handleShuffleClick = useCallback(() => {
		setSortedQuestions(shuffle(sortedQuestions));
		window.scrollTo({ top: 0 });
	}, [sortedQuestions]);

	return (
		<Grid>
			<Navigation active="All" />
			<ShuffleButton onClick={handleShuffleClick} />
			{sortedQuestions.map((question) => (
				<Question key={question.id} question={question} />
			))}
		</Grid>
	);
}

export async function getStaticProps() {
	const { questions } = await graphcms.request(QUESTIONS_QUERY);

	return {
		props: {
			questions,
		},
	};
}
