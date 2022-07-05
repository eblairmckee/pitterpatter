export default function Grid({ children }) {
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
