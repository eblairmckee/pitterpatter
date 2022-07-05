type QuestionProps = {
	question: unknown;
};

export default function Question({ question }: QuestionProps) {
	// @ts-ignore
	const { id, answer, tags, prompt } = question;
	return (
		<div key={id}>
			<h2>{prompt}</h2>
			<div dangerouslySetInnerHTML={{ __html: answer.html }}></div>
			{tags.map((tag: unknown) => (
				// @ts-ignore
				<button key={tag}>{tag}</button>
			))}
		</div>
	);
}
