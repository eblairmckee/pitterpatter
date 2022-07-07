import { Question as QuestionType } from '../graphql/generated';
import { styled } from '@linaria/react';
import Tag, { TagWrapper } from './Tag';
import { background } from '../styles/colors';
import { useCallback, useState } from 'react';
import { shadow } from '../styles/shared';
import Button from './Button';

type QuestionProps = {
	question: QuestionType;
};

export default function Question({ question }: QuestionProps) {
	const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const { id, answer, tags, prompt } = question;

	const handleCardClick = useCallback(() => {
		if (!showAnswer) {
			setShowAnswer(true);
		}
	}, [showAnswer]);
	return (
		<QuestionWrapper>
			<QuestionStyles key={id}>
				<QuestionHeading
					style={{
						fontSize: showAnswer
							? 'max(2vw, 24px)'
							: 'max(5vw, 36px)',
					}}
				>
					{prompt}
				</QuestionHeading>
				{showAnswer ? (
					<Answer
						dangerouslySetInnerHTML={{
							__html: answer.html,
						}}
					></Answer>
				) : (
					<Button centered onClick={handleCardClick}>
						↻
					</Button>
				)}
				<TagWrapper>
					{tags.map((tag) => (
						<Tag key={tag} name={tag} />
					))}
				</TagWrapper>
			</QuestionStyles>
		</QuestionWrapper>
	);
}

const QuestionWrapper = styled.div`
	scroll-snap-align: start;
`;

const QuestionStyles = styled.div`
	margin-top: 3em;
	display: grid;
	grid-template-rows: auto 1fr auto;
	padding: 10%;
	background: ${background};
	border-radius: 16px;
	height: 80vh;
	overflow-y: scroll;
	${shadow};
`;

const QuestionHeading = styled.h2`
	text-align: center;
	transition: ease all 300ms;
	padding: 0 5vw;
`;

const Answer = styled.div`
	padding: 4em 0;
	transition: ease all 500ms;
	transform: translateY(-2em);
	animation-delay: 250ms;
`;
