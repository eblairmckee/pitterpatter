import { PropsWithChildren } from 'react';
import { styled } from '@linaria/react';
import { backgroundGradient } from '../styles/colors';

export default function Grid({ children }: PropsWithChildren) {
	return <GridStyles>{children}</GridStyles>;
}

const GridStyles = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5vw;
	padding: 90px 5vw 5vw 5vw;
	${backgroundGradient};
	min-height: 100vh;
`;
