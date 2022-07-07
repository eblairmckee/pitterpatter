import { useCallback, useState, memo, useEffect } from 'react';
import { graphcms } from '../../api/graphCMS';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Question from '../../components/Question';
import { shuffle } from '../../utils/shuffle';
import QUESTIONS_BY_TAG from '../../src/queries/questionsByTag.graphql';
import { Tag, Question as QuestionType } from '../../graphql/generated';
import Navigation from '../../components/Navigation';

type TagPageProps = {
	questions: QuestionType[];
	tag: Tag;
};

function TagPage({ questions, tag }: TagPageProps) {
	const [sortedQuestions, setSortedQuestions] = useState(questions);

	useEffect(() => {
		// shuffle on mount to prevent server/DOM mismatch
		setSortedQuestions(shuffle(questions));
	}, [questions]);

	const handleShuffleClick = useCallback(() => {
		setSortedQuestions(shuffle(sortedQuestions));
	}, [sortedQuestions]);
	return (
		<Grid>
			<Navigation active={tag} />
			<Button fab onClick={handleShuffleClick}>
				⇅
			</Button>
			{sortedQuestions.map((question) => (
				<Question key={question.id} question={question} />
			))}
		</Grid>
	);
}

export default memo(TagPage);

export function getStaticPaths() {
	const paths = Object.values(Tag).map((tag) => ({
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
	const tag = params.tag as Tag;

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
			tag,
		},
	};
}
