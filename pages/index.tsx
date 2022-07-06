import { shuffle } from '../utils/shuffle';
import { useCallback, useState } from 'react';
import { graphcms } from '../api/graphCMS';
import Question from '../components/Question';
import Grid from '../components/Grid';
import Button from '../components/Button';
import QUESTIONS_QUERY from '../src/queries/questions.graphql';
import Navigation from '../components/Navigation';
import { Question as QuestionType } from '../graphql/generated';

type PageProps = { questions: QuestionType[] };

export default function Home({ questions }: PageProps) {
	const [sortedQuestions, setSortedQuestions] =
		useState<QuestionType[]>(questions);

	const handleShuffleClick = useCallback(() => {
		setSortedQuestions(shuffle(sortedQuestions));
	}, [sortedQuestions]);
	return (
		<Grid>
			<Navigation active="All" />
			<Button onClick={handleShuffleClick}>Shuffle</Button>
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
