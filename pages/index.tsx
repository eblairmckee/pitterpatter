import { gql } from 'graphql-request';
import { shuffle } from '../utils/shuffle';
import { useCallback, useState } from 'react';
import { graphcms } from '../api/graphCMS';
import Question from '../components/Question';
import Grid from '../components/Grid';
import Button from '../components/Button';

const QUERY = gql`
	query Question {
		questions {
			prompt
			tags
			id
			answer {
				html
			}
		}
	}
`;

type PageProps = { questions: unknown[] };

export default function Home({ questions }: PageProps) {
	const [sortedQuestions, setSortedQuestions] = useState(questions);

	const handleShuffleClick = useCallback(() => {
		setSortedQuestions(shuffle(sortedQuestions));
	}, [sortedQuestions]);
	return (
		<Grid>
			<Button onClick={handleShuffleClick}>Shuffle</Button>
			{sortedQuestions.map((question) => (
				// @ts-ignore
				<Question key={question.id} question={question} />
			))}
		</Grid>
	);
}

export async function getStaticProps() {
	const { questions } = await graphcms.request(QUERY);

	return {
		props: {
			questions,
		},
	};
}
