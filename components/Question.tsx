export default function Question({ question }) {
	const { id, answer, tags, prompt } = question;
	return (
		<div key={id}>
			<h2>{prompt}</h2>
			<div dangerouslySetInnerHTML={{ __html: answer.html }}></div>
			{tags.map((tag) => (
				<button key={tag}>{tag}</button>
			))}
		</div>
	);
}
