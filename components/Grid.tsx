import { PropsWithChildren } from 'react';

export default function Grid({ children }: PropsWithChildren) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				background: 'pink',
			}}
		>
			{children}
		</div>
	);
}
