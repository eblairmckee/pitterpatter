import { Question as QuestionType } from '../graphql/generated';
import { styled } from '@linaria/react';
import Tag, { TagWrapper } from './Tag';
import { accentColors, background } from '../styles/colors';
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
		<QuestionStyles key={id}>
			<QuestionHeading>{prompt}</QuestionHeading>
			{showAnswer ? (
				<Answer
					dangerouslySetInnerHTML={{
						__html: answer.html,
					}}
				></Answer>
			) : (
				<Button
					color={flipButtonBackground}
					centered
					onClick={handleCardClick}
				>
					⟳
				</Button>
			)}
			<TagWrapper>
				{tags.map((tag) => (
					<Tag key={tag} name={tag} />
				))}
			</TagWrapper>
		</QuestionStyles>
	);
}

const flipButtonBackground = `linear-gradient(to right, ${accentColors[0]}, ${accentColors[1]})`;

// const QuestionWrapper = styled.div`
// 	scroll-snap-align: start;
// `;

const QuestionStyles = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	gap: 3em;
	padding: 10%;
	background: ${background};
	border-radius: 16px;
	overflow-y: scroll;
	${shadow};
	transition: ease all 250ms;
`;

const QuestionHeading = styled.h2`
	text-align: center;
	transition: ease all 300ms;
	padding: 0 5vw;
	font-size: 36px;
`;

const Answer = styled.div`
	padding: 4em 0;
	transition: ease all 500ms;
	transform: translateY(-2em);
	animation-delay: 250ms;
`;
