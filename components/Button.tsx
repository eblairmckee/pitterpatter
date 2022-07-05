import { MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
	children,
	onClick,
}: PropsWithChildren<ButtonProps>) {
	return <button onClick={onClick}>{children}</button>;
}
