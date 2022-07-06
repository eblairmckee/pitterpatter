import { gql } from 'graphql-request';
import { useCallback, useState } from 'react';
import { graphcms } from '../../api/graphCMS';
import { tags } from '../../api/tags';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Question from '../../components/Question';
import { shuffle } from '../../utils/shuffle';
import QUESTIONS_BY_TAG from '../../src/queries/questionsByTag.graphql';

// @ts-ignore
// export default function TagPage({ questions }) {
// 	const [sortedQuestions, setSortedQuestions] = useState(questions);

// 	const handleShuffleClick = useCallback(() => {
// 		setSortedQuestions(shuffle(sortedQuestions));
// 	}, [sortedQuestions]);
// 	return (
// 		<Grid>
// 			<Button onClick={handleShuffleClick}>Shuffle</Button>
// 			{/* @ts-ignore */}
// 			{sortedQuestions.map((question) => (
// 				<Question key={question.id} question={question} />
// 			))}
// 		</Grid>
// 	);
// }

export default function Page(props) {
	console.log({ props });

	return <div></div>;
}

export function getStaticPaths() {
	// TODO: generate this from schema
	const paths = tags.map((tag) => ({
		params: {
			tag,
		},
	}));
	return {
		paths,
		fallback: false,
	};
}

// @ts-ignore
export async function getStaticProps({ params }) {
	console.log({ params });

	const tag = params.tag;

	const { questions } = await graphcms.request(QUESTIONS_BY_TAG, {
		tags: [tag],
	});

	if (questions?.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			questions,
		},
	};
}
