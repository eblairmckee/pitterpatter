import { accentColors } from '../styles/colors';
import Button from './Button';

type ShuffleButtonProps = { onClick: () => void };

export default function ShuffleButton({ onClick }: ShuffleButtonProps) {
	return (
		<Button
			style={{ transform: 'rotate(90deg)' }}
			fab
			onClick={onClick}
			color={shuffleButtonBackground}
		>
			⇅
		</Button>
	);
}

const shuffleButtonBackground = `linear-gradient(${accentColors[5]}, ${accentColors[6]})`;
