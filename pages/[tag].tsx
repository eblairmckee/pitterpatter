import { gql } from 'graphql-request';
import { useCallback, useState } from 'react';
import { graphcms } from '../api/graphCMS';
import { tags } from '../api/tags';
import Button from '../components/Button';
import Grid from '../components/Grid';
import Question from '../components/Question';
import { shuffle } from '../utils/shuffle';

// @ts-ignore
export default function TagPage({ questions }) {
	const [sortedQuestions, setSortedQuestions] = useState(questions);

	const handleShuffleClick = useCallback(() => {
		setSortedQuestions(shuffle(sortedQuestions));
	}, [sortedQuestions]);
	return (
		<Grid>
			<Button onClick={handleShuffleClick}>Shuffle</Button>
			{/* @ts-ignore */}
			{sortedQuestions.map((question) => (
				<Question key={question.id} question={question} />
			))}
		</Grid>
	);
}

export function getStaticPaths() {
	// const paths = tags.map((tag) => ({
	// 	params: {
	// 		tag,
	// 	},
	// }));
	const paths = [
		{ params: { tag: 'javascript' } },
		{ params: { tag: 'JavaScript' } },
	];
	return {
		paths,
		fallback: false,
	};
}

// @ts-ignore
export async function getStaticProps({ context }) {
	const tag = context.params.tag;

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

	const { questions } = await graphcms.request(QUERY, { tag });

	if (questions?.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: questions,
	};
}
