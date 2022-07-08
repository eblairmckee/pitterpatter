import { Tag as TagType } from '../graphql/generated';
import { styled } from '@linaria/react';
import { backgroundGradient } from '../styles/colors';
import { shadow } from '../styles/shared';
import Tag from './Tag';

type NavProps = {
	active: TagType | 'All';
};

export default function Navigation({ active }: NavProps) {
	return (
		<NavWrapper>
			<NavGrid>
				<Tag name="All" />
				{Object.values(TagType).map((tag) => (
					<Tag key={tag} name={tag} />
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
	transition: ease all 250ms;
`;

const NavGrid = styled.nav`
	display: flex;
	gap: 0.5em;
	padding: 0.5em 1em;
	overflow-x: scroll;
	text-align: center;
	@media (min-width: 768px) {
		> * {
			transition: ease all 250ms;
			transform: scale(0.7);
		}
		&:hover {
			> * {
				transform: scale(1);
			}
		}
	}
`;
const NavItem = styled.h3`
	margin-block-start: 0;
	margin-block-end: 0;
	cursor: pointer;
`;
