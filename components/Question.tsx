import Link from 'next/link';
import { Question as QuestionType } from '../graphql/generated';

type QuestionProps = {
	question: QuestionType;
};

export default function Question({ question }: QuestionProps) {
	const { id, answer, tags, prompt } = question;
	return (
		<div
			key={id}
			style={{ height: '90vh', border: '5px dashed rebeccapurple' }}
		>
			<h2>{prompt}</h2>
			<div dangerouslySetInnerHTML={{ __html: answer.html }}></div>
			{tags.map((tag) => (
				<Link href={`/tags/${tag}`} key={tag}>
					<button>{tag}</button>
				</Link>
			))}
		</div>
	);
}
