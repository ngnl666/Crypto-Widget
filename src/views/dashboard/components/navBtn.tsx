import styled from 'styled-components';

export const NavBtn = styled.li`
	position: relative;
	z-index: 10;
	display: flex;
	cursor: pointer;
	align-items: center;
	column-gap: 0.25rem;
	color: white;
	padding: 0.5rem 0.75rem;
	transition: all 350ms cubic-bezier(0.77, 0, 0.175, 1);
	&::before,
	&::after {
		content: '';
		width: 100%;
		position: absolute;
		left: 0;
		height: 0;
		transition: inherit;
		z-index: -1;
	}
	&::before {
		top: 0;
		border-left: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
	}
	&::after {
		bottom: 0;
	}
	&:hover {
		color: #3e4063;
		transition-delay: 0.15s;
		& .navIcon {
			transition-delay: 0.2s;
			color: #3e4063;
		}
		&::before,
		&::after {
			height: 100%;
		}
		&::before {
			transition-delay: 0s;
		}
		&::after {
			background-color: #ffffff;
			transition-delay: 0.08s;
		}
	}
`;
