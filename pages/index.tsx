import type { NextPage } from 'next';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';

const graphcms = new GraphQLClient(
	'https://api-us-west-2.graphcms.com/v2/cl58dr7dj51ih01up305jdxh6/master',
	{
		headers: {
			Authorization:
				'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTcwMzgxOTYsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NsNThkcjdkajUxaWgwMXVwMzA1amR4aDYvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYjM0NzZlYzMtYWM0Yi00MTE4LWIzNjUtYTE3MTQ5MDE3ZjE0IiwianRpIjoiY2thNWo0djJmMDN3bTAxejNhMmN2ZXo0ZCJ9.tNRHbTIFQHVtPt93R4Pb_as_3VBQRazVHJ8ZvqQyHzK18wSnQ_lS9GxScnRCbbqgcWfJgwAl__fhlPDY6pQewinPMsKJ0MroexDYptk1VsvHtzOsNmvjPpaFcah9b6Tis1IQw_GUsb4IK6Brjp1gazkzBF9VYv4q-BjQE7Zlt2XlaJGdQlohdp7gMz9Ab8yBYRiZDba2MrIuiOuAGMLR5NARJkVaDWPZ12rmggzqCTUH8vx36Vahpush6HyYFVtwJGmDkLp_Og-dCKVzoymrEBH6jrzFRll9I428Pw6syDUZcfJd-nZVcy5HAkeRiGY_1sOVNosZr24ENWat-a1yWn0BK6OhsbOSn-C1E8MkCzToRxSSb7z9sWBagY5UY5BwkrTK7RchFQf9xGTeIaPEecIJ6EYmpbPfnaIf03v7TgT4qgGuc21SaCAc78EFo5HvyrapYCbvigqu4kCHYd-rqataUU9v6SkDm6beOQrn4RGVKni6i6GdpROIMKPJ3FoeNPVtHEAP6d4AgU7c_4z7XiXjuBGIrUhW8Mq0PmMXMp-MeIHIVNKvtZqzKJfKCpW4PNorUvHq_NtkdpLKGf08S4JDuxPQ1WRCOLJSW72DHD4snKV912UFVGSEgNiswpEQNjNv1v0q2rjnN4t4_2ArNasJ4rVUheI7WpP5J4yeQVs',
		},
	}
);

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

const queryVariables = {
	tags: ['JavaScript'],
};

const Home: NextPage = ({ questions }) => {
	return (
		<div style={{ height: '100vh', background: 'pink' }}>
			{questions.map(({ prompt, answer, tags, id }) => (
				<div key={id}>
					<h2>{prompt}</h2>
					{answer.html}
					{tags.map((tag) => (
						<button key={tag}>{tag}</button>
					))}
				</div>
			))}
		</div>
	);
};

export async function getStaticProps() {
	const { questions } = await graphcms.request(QUERY, queryVariables);

	return {
		props: {
			questions,
		},
	};
}

export default Home;
