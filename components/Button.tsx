import { MouseEventHandler, PropsWithChildren } from 'react';
import { styled } from '@linaria/react';
import { accentColors } from '../styles/colors';
import { shadow } from '../styles/shared';
import { css, cx } from '@linaria/core';

type ButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>;
	fab?: boolean;
	centered?: boolean;
};

export default function Button({
	children,
	onClick,
	fab,
	centered,
}: PropsWithChildren<ButtonProps>) {
	return (
		<ButtonStyles
			onClick={onClick}
			className={cx(
				fab ? fabStyles : undefined,
				centered ? centeredStyles : undefined
			)}
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
		&:hover {
			transform: scale(0.95);
		}
`;

const ButtonStyles = styled.button`
	background: ${accentColors[0]};
	${buttonDefaultStyles};
	height: 2em;
	width: 2em;
	font-size: 1.8em;
	${shadow}
`;

const fabStyles = css`
	position: fixed;
	bottom: 1em;
	left: 1em;
	border-radius: 100%;
`;

const centeredStyles = css`
	justify-self: center;
	align-self: center;
`;
