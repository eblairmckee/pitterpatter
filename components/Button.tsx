import { MouseEventHandler, PropsWithChildren } from 'react';
import { styled } from '@linaria/react';
import { accentColors } from '../styles/colors';
import { shadow } from '../styles/shared';
import { css, CSSProperties, cx } from '@linaria/core';

type ButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>;
	fab?: boolean;
	centered?: boolean;
	color?: string;
	style?: CSSProperties;
};

export default function Button({
	children,
	onClick,
	fab,
	centered,
	color,
	style,
}: PropsWithChildren<ButtonProps>) {
	const getColors = color
		? { background: color }
		: { background: accentColors[0] };
	return (
		<ButtonStyles
			onClick={onClick}
			className={cx(
				fab ? fabStyles : undefined,
				centered ? centeredStyles : undefined
			)}
			style={{ ...getColors, ...style }}
		>
			{children}
		</ButtonStyles>
	);
}

export const buttonDefaultStyles = `
		color: white;
		font-weight: bold;
		cursor: pointer;
		transition: ease all 300ms;
		border-radius: 20px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover {
			transform: scale(0.95);
		}
`;

const ButtonStyles = styled.button`
	${buttonDefaultStyles};
	height: 2em;
	width: 2em;
	font-size: 1.8em;
	${shadow}
`;

const fabStyles = css`
	border-radius: 100%;
	position: fixed;
	bottom: 1em;
	left: 1em;
`;

const centeredStyles = css`
	justify-self: center;
	align-self: center;
`;
