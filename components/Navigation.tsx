import Link from 'next/link';
import { Tag } from '../graphql/generated';

type NavProps = {
	active: Tag | 'All';
};

export default function Navigation({ active }: NavProps) {
	return (
		<nav>
			<Link href="/" key="All">
				All
			</Link>
			{Object.values(Tag).map((tag) => (
				<Link href={`/tags/${tag}`} key={tag}>
					{tag}
				</Link>
			))}
		</nav>
	);
}
