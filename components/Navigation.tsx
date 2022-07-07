import Link from 'next/link';
import { Tag } from '../graphql/generated';
import { styled } from '@linaria/react';
import { backgroundGradient } from '../styles/colors';
import { shadow } from '../styles/shared';

type NavProps = {
	active: Tag | 'All';
};

export default function Navigation({ active }: NavProps) {
	return (
		<NavWrapper>
			<NavGrid>
				<Link href="/" key="All">
					<NavItem>All</NavItem>
				</Link>
				{Object.values(Tag).map((tag) => (
					<Link href={`/tags/${tag}`} key={tag}>
						<NavItem>{tag}</NavItem>
					</Link>
				))}
			</NavGrid>
		</NavWrapper>
	);
}

const NavWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	${backgroundGradient};
	${shadow};
	width: 100%;
	opacity: 0;
	transform: translateY(-50%);
	transition: ease all 250ms;
	&:hover {
		opacity: 1;
		transform: translateY(0%);
	}
`;

const NavGrid = styled.nav`
	display: flex;
	gap: 2em;
	padding: 1em 2em;
	overflow-x: scroll;
	text-align: center;
`;
const NavItem = styled.h3`
	margin-block-start: 0;
	margin-block-end: 0;
	cursor: pointer;
`;
