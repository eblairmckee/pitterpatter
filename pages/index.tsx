import type { NextPage } from 'next';
import { gql } from 'graphql-request';
import { shuffle } from '../utils/shuffle';
import { useCallback, useState } from 'react';
import { graphcms } from '../api/graphCMS';
import Question from '../components/Question';
import Grid from '../components/Grid';
import Button from '../components/Button';

const QUERY = gql`
	query QuestionByTag($tags: [String!]) {
		questions(where: { tags: $tags }) {
			prompt
			tags
			id
			answer {
				html
			}
		}
	}
`;

// dynamic pages based on tag name
// randomize questions on render

const queryVariables = {
	tags: ['JavaScript'],
};

export default function Home({ questions }: NextPage) {
	const [sortedQuestions, setSortedQuestions] = useState(questions);

	const handleShuffleClick = useCallback(() => {
		setSortedQuestions(shuffle(sortedQuestions));
	}, [sortedQuestions]);
	return (
		<Grid>
			<Button onClick={handleShuffleClick}>Shuffle</Button>
			{sortedQuestions.map((question) => (
				<Question key={question.id} question={question} />
			))}
		</Grid>
	);
}

export async function getStaticProps() {
	const { questions } = await graphcms.request(QUERY, queryVariables);

	return {
		props: {
			questions,
		},
	};
}
