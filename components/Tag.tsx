import Link from 'next/link';
import { Tag as TagType } from '../graphql/generated';
import { styled } from '@linaria/react';
import { accentColors } from '../styles/colors';
import { buttonDefaultStyles } from './Button';
import { shadow } from '../styles/shared';

const tagArr = Object.values(TagType);
const tagColorMap: Record<TagType, string> = tagArr.reduce((acc, tag) => {
	const tagIdx = tagArr.indexOf(tag);
	const tagLen = tagArr.length;
	const colorsLen = accentColors.length;
	if (tagIdx < colorsLen) {
		acc[tag] = accentColors[tagIdx];
	} else {
		const normalizer = Math.floor(tagLen / colorsLen) * colorsLen;
		const relativeIdx = tagIdx - normalizer;
		acc[tag] = accentColors[relativeIdx];
	}
	return acc;
}, {} as Record<TagType, string>);

type TagProps = {
	name: TagType;
};

export default function Tag({ name }: TagProps) {
	return (
		<Link href={`/tags/${name}`}>
			<TagStyles style={{ backgroundColor: tagColorMap[name] }}>
				{name}
			</TagStyles>
		</Link>
	);
}

const TagStyles = styled.button`
	border-radius: 20px;
	padding: 1em 2em;
	${buttonDefaultStyles};
	${shadow}
`;

export const TagWrapper = styled.div`
	display: flex;
	gap: 0.5em;
	align-self: flex-end;
`;
